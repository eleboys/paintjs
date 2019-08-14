import { TestBed } from '@angular/core/testing';

import { ImageProcessingService } from './image-processing.service';

describe('ImageProcessingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImageProcessingService = TestBed.get(ImageProcessingService);
    expect(service).toBeTruthy();
  });
});
