import { TestBed } from '@angular/core/testing';

import { ImageProcessingService } from './image-processing.service';
import { AppModule } from 'src/app/app.module';
import { Pixel } from 'src/app/models/pixel.model';
import { Color } from 'src/app/models/color.model';
import { SimpleImage } from 'src/app/models/simple-image.model';

describe('ImageProcessingService', () => {

  let service: ImageProcessingService;
  const pixels = [
    new Pixel(0, 0, new Color(10, 10, 10)),
    new Pixel(1, 0, new Color(20, 20, 20)),
    new Pixel(0, 1, new Color(30, 30, 30)),
    new Pixel(1, 1, new Color(40, 40, 40)),
  ];
  const data = new Uint8ClampedArray([10, 10, 10, 255, 20, 20, 20, 255, 30, 30, 30, 255, 40, 40, 40, 255]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ AppModule ]
    });
    service = TestBed.get(ImageProcessingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate mean color correctly', () => {

    const avgColor = service.calculateMeanColor(pixels, [1 / 4, 1 / 4, 1 / 4, 1 / 4]);

    expect(avgColor).toEqual(jasmine.objectContaining({
      r: (10 + 20 + 30 + 40) * 0.25,
      g: (10 + 20 + 30 + 40) * 0.25,
      b: (10 + 20 + 30 + 40) * 0.25,
    }));
  });

  it('should convert ImageData object to SimpleImage', () => {
    const imageData = new ImageData(data, 2, 2);

    const simpleImage = service.imageDataToSimpleImage(imageData);

    expect(simpleImage.height).toEqual(2);
    expect(simpleImage.width).toEqual(2);
    expect(simpleImage.pixels).toEqual(jasmine.arrayContaining(pixels));
  });

  it('should convert SimpleImage object to ImageData', () => {
    const simpleImage = new SimpleImage(2, 2);
    simpleImage.pixels = pixels;

    const imageData = service.simpleImageToImageData(simpleImage);

    expect(imageData).toEqual(jasmine.any(ImageData));
    expect(imageData.width).toEqual(simpleImage.width);
    expect(imageData.height).toEqual(simpleImage.height);
    expect(imageData.data).toEqual(jasmine.arrayWithExactContents(Array.from(data)));
  });
});
