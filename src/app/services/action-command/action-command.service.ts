import { Injectable } from '@angular/core';
import { WebWorkerService } from '../web-worker/web-worker.service';
import { ActionCommand } from 'src/app/models/action-command.model';
import { PaintJsStore } from '../store/paintjs-store';
import { CommandNames } from 'src/app/models/command-names.enum';
import { ImageMatrix } from 'src/app/models/image-matrix.model';

@Injectable()
export class ActionCommandService {

  constructor(
    private workerService: WebWorkerService,
    private store: PaintJsStore) {
    this.workerService.subject.subscribe(data => {
      this.store.set('currentImage', data.matrix);
      this.updateCommandOnStore(data.command, data.matrix);
    });
  }

  execute(name: CommandNames, params?: any) {
    const command = this.add(name, params);
    this.workerService.post(command);
  }

  add(name: CommandNames, params?: any): ActionCommand {
    const stack = this.store.value.commandStack;
    const command = new ActionCommand(name, 'c' + stack.length.toString(), this.store.value.currentImage, params);
    stack.push(command);
    this.store.set('commandStack', stack);
    this.store.set('activeCommandId', command.id);
    return command;
  }

  undo() {
    const stack = this.store.value.commandStack;
    const activeCommandId = this.store.value.activeCommandId;

    const index = stack.findIndex(c => c.id === activeCommandId);
    if (!activeCommandId || !index || stack.length < 2 || index < 1) {
      return;
    }

    const command = stack[index - 1];
    if (command.name === CommandNames.Null) {
      return;
    }
    this.store.set('activeCommandId', command.id);
    this.store.set('currentImage', command.matrix);
  }

  redo() {
    const stack = this.store.value.commandStack;
    const activeCommandId = this.store.value.activeCommandId;

    const index = stack.findIndex(c => c.id === activeCommandId);
    if (!activeCommandId || index < 0 || stack.length <= (index + 1)) {
      return;
    }

    const command = stack[index + 1];
    this.store.set('activeCommandId', command.id);
    this.store.set('currentImage', command.matrix);
  }

  private updateCommandOnStore(command: ActionCommand, matrix: ImageMatrix) {
    const commandStack = this.store.value.commandStack;
    const index = commandStack.findIndex(c => c.id === command.id);
    if (index < 0) {
      return;
    }
    commandStack[index].matrix = matrix;
    this.store.set('commandStack', commandStack)
  }
}
