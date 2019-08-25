import { Injectable } from '@angular/core';

import { WebWorkerService } from '../web-worker/web-worker.service';
import { ActionCommand } from 'src/app/models/action-command.model';
import { PaintJsStore } from '../store/paintjs-store';
import { CommandNames } from 'src/app/models/command-names.enum';
import { SimpleImage } from 'src/app/models/simple-image.model';

@Injectable()
export class ActionCommandService {

  constructor(
    private workerService: WebWorkerService,
    private store: PaintJsStore) {
    this.workerService.subject.subscribe(data => {
      const image = Object.assign(new SimpleImage(0, 0), data.image);
      this.store.set('currentImage', image);
      this.store.set('inProgress', false);
      this.updateCommandOnStore(data.command, image);
    });
  }

  execute(name: CommandNames, params?: any) {
    const command = this.add(name, params);
    this.workerService.post(command);
    this.store.set('inProgress', true);
  }

  add(name: CommandNames, params?: any): ActionCommand {
    const stack: ActionCommand[] = this.store.get('commandStack');
    const image: SimpleImage = this.store.get('currentImage');
    const command = new ActionCommand(name, 'c' + stack.length.toString(), image, params);
    stack.push(command);
    this.store.set('activeCommandId', command.id);
    this.store.set('commandStack', stack);
    return command;
  }

  undo() {
    const stack: ActionCommand[] = this.store.get('commandStack');
    const activeCommandId: string = this.store.get('activeCommandId');

    const index = stack.findIndex(c => c.id === activeCommandId);
    if (!activeCommandId || !index || stack.length < 2 || index < 1) {
      return;
    }

    const command = stack[index - 1];
    if (command.name === CommandNames.Null) {
      return;
    }
    this.store.set('activeCommandId', command.id);
    this.store.set('currentImage', command.image);
  }

  redo() {
    const stack: ActionCommand[] = this.store.get('commandStack');
    const activeCommandId: string = this.store.get('activeCommandId');

    const index = stack.findIndex(c => c.id === activeCommandId);
    if (!activeCommandId || index < 0 || stack.length <= (index + 1)) {
      return;
    }

    const command = stack[index + 1];
    this.store.set('activeCommandId', command.id);
    this.store.set('currentImage', command.image);
  }

  private updateCommandOnStore(command: ActionCommand, simage: SimpleImage) {
    const commandStack: ActionCommand[] = this.store.get('commandStack');
    const index = commandStack.findIndex(c => c.id === command.id);
    if (index < 0) {
      return;
    }
    commandStack[index].image = simage;
    this.store.set('commandStack', commandStack);
  }
}
