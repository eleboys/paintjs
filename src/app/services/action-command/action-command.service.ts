import { Injectable } from '@angular/core';
import { WebWorkerService } from '../web-worker/web-worker.service';
import { ActionCommand } from 'src/app/models/action-command.model';
import { PaintJsStore } from '../store/paintjs-store';

@Injectable()
export class ActionCommandService {

  constructor(
    private workerService: WebWorkerService,
    private store: PaintJsStore) {
    this.workerService.subject.subscribe(data => {
      this.store.set('currentImage', data.matrix);
    });
  }

  executeCommand(name: string, params?: any) {
    const stack = this.store.value.commandStack;
    const command = new ActionCommand(name, this.store.value.currentImage, params);
    stack.push(command);
    this.store.set('commandStack', stack);

    this.workerService.post(command);
  }
}
