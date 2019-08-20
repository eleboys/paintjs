import { TestBed } from '@angular/core/testing';

import { ImageService } from './image.service';
import { AppModule } from 'src/app/app.module';
import { first } from 'rxjs/operators';
import { Color } from 'src/app/models/color.model';
import { SimpleImage } from 'src/app/models/simple-image.model';
import { Pixel } from 'src/app/models/pixel.model';

describe('ImageService', () => {
  let service: ImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule]
    });

    service = TestBed.get(ImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a SimpleImage from a Blob object', (done) => {
    const blob = createMockBlob();

    service.blobToSimpleImage(blob)
      .pipe(first())
      .subscribe((simage) => {
        console.log(service.simpleImageDataURL(simage));
        const pixel1x1 = simage.getPixel(1, 1);
        expect(simage.height).toEqual(2);
        expect(simage.width).toEqual(2);
        expect(pixel1x1.color).toEqual(new Color(114, 253, 255));
        done();
      });
  });

  it('should create right DataURL from SimpleImage object', () => {
    const simage = new SimpleImage(2, 2);
    simage.pixels = [
      { x: 0, y: 0, color: { r: 0, g: 145, b: 146 } },
      { x: 1, y: 0, color: { r: 255, g: 64, b: 255 } },
      { x: 0, y: 1, color: { r: 255, g: 38, b: 0 } },
      { x: 1, y: 1, color: { r: 114, g: 253, b: 255 }
    }];
    const dataUrl = service.simpleImageDataURL(simage);
    // tslint:disable-next-line: max-line-length
    const url = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAG0lEQVQYV2NkmDjp///1uQyM/9UY/hdf/88AAE3fCK1aqk0jAAAAAElFTkSuQmCC';

    expect(dataUrl).toEqual(url);
  });

  function createMockBlob(): Blob {
    // tslint:disable-next-line: max-line-length
    const b64Data = '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';
    const byteCharacters = atob(b64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/png' });
    return blob;
  }
});
