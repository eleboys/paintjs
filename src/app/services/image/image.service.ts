import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { ImageMatrix } from 'src/app/models/image-matrix.model';
import { map } from 'rxjs/operators';

@Injectable()
export class ImageService {

  blobToImageMatrix(blob: Blob): Observable<ImageMatrix> {
    return from(createImageBitmap(blob)).pipe(map(bmp => {
      const rect = this.getDrawingRect(bmp.width, bmp.height);
      const canvas = document.createElement('canvas');
      canvas.width = rect.x2;
      canvas.height = rect.y2;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(bmp, rect.x1, rect.y1, rect.x2, rect.y2);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      return this.imageDataToImageMatrix(imgData);
    }));
  }

  matrixToImageData(matrix) {
    const data = new Uint8ClampedArray(matrix.width * matrix.height * 4);
    for (let y = 0; y < matrix.height; y++) {
      for (let x = 0; x < matrix.width; x++) {
        const color = matrix.data[y][x];
        data[x * 4 + y * matrix.width * 4 + 0] = (color.r);
        data[x * 4 + y * matrix.width * 4 + 1] = (color.g);
        data[x * 4 + y * matrix.width * 4 + 2] = (color.b);
        data[x * 4 + y * matrix.width * 4 + 3] = (color.a);
      }
    }

    return new ImageData(data, matrix.width, matrix.height)
  }


  imageDataToImageMatrix(imgData) {
    const matrix = [];
    for (let y = 0; y < imgData.height; y++) {
      const row = [];
      for (let x = 0; x < imgData.width; x++) {
        const i = x * 4 + y * imgData.width * 4;
        row.push({
          r: imgData.data[i],
          g: imgData.data[i + 1],
          b: imgData.data[i + 2],
          a: imgData.data[i + 3],
        });
      }
      matrix.push(row);
    }
    return new ImageMatrix(imgData.width, imgData.height, matrix);
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
