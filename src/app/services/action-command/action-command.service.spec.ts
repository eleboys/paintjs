import { TestBed } from '@angular/core/testing';

import { ActionCommandService } from './action-command.service';

describe('ActionCommandService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActionCommandService = TestBed.get(ActionCommandService);
    expect(service).toBeTruthy();
  });
});
