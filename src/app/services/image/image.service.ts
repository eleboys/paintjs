import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { ImageMatrix } from 'src/app/models/image-matrix.model';
import { map } from 'rxjs/operators';
import { ImageProcessingService } from '../image-processing/image-processing.service';

@Injectable()
export class ImageService {

  constructor(private imageProcessingService: ImageProcessingService) {
  }

  blobToImageMatrix(blob: Blob): Observable<ImageMatrix> {
    return from(createImageBitmap(blob)).pipe(map(bmp => {
      const rect = this.getDrawingRect(bmp.width, bmp.height);
      const canvas = document.createElement('canvas');
      canvas.width = rect.x2;
      canvas.height = rect.y2;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(bmp, rect.x1, rect.y1, rect.x2, rect.y2);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      return this.imageProcessingService.imageDataToImageMatrix(imgData);
    }));
  }

  imageMatrixDataURL(matrix: ImageMatrix): string {
    const imageData = this.imageProcessingService.matrixToImageData(matrix);
    const canvas = document.createElement('canvas');
    canvas.width = matrix.width;
    canvas.height = matrix.height;
    const ctx = canvas.getContext('2d');
    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL();
  }

  downloadImageMatrix(matrix: ImageMatrix, fileName: string) {
    const link = document.createElement('a');
    link.setAttribute('download', fileName);
    link.setAttribute('href', this.imageMatrixDataURL(matrix));
    link.click();
  }

  getDrawingRect(width, height) {
    const rect = this.getDrawingSize(window.innerWidth - 250, window.innerHeight - 200, width, height);
    return {
      x1: 0,
      y1: 0,
      x2: rect.width,
      y2: rect.height
    };
  }

  getDrawingSize(tw, th, sw, sh) {
    let w: number;
    let h: number;

    if (sw > sh) {
      w = Math.min(tw, sw);
      h = sh * w / sw;
    } else {
      h = Math.min(th, sh);
      w = sw * h / sh;
    }
    return {
      width: w,
      height: h
    };
  }
}
