import { TestBed } from '@angular/core/testing';

import { ActionCommandService } from './action-command.service';
import { WebWorkerService } from '../web-worker/web-worker.service';
import { AppModule } from 'src/app/app.module';

describe('ActionCommandService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ AppModule ]
  }));

  it('should be created', () => {
    const service: ActionCommandService = TestBed.get(ActionCommandService);
    expect(service).toBeTruthy();
  });
});
