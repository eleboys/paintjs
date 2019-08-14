import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

const PaintJsWorker = new Worker('../../app.worker', { type: 'module' });

@Injectable()
export class WebWorkerService {

  subject = new Subject<any>();

  constructor() {
    PaintJsWorker.onmessage = ({data}) => {
      this.subject.next(data);
    };
  }

  post(message: any) {
    PaintJsWorker.postMessage(message);
  }
}
