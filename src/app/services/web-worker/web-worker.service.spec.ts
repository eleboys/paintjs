import { TestBed } from '@angular/core/testing';

import { WebWorkerService } from './web-worker.service';

describe('WebWorkerService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ WebWorkerService ]
  }));

  it('should be created', () => {
    const service: WebWorkerService = TestBed.get(WebWorkerService);
    expect(service).toBeTruthy();
  });
});
