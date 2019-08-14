import { ImageMatrix } from 'src/app/models/image-matrix.model';

export class ImageProcessingService {

  constructor() { }


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

    return new ImageData(data, matrix.width, matrix.height);
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


  getMatrixMeanColor(matrix) {
    // tslint:disable-next-line: one-variable-per-declaration
    let r = 0, g = 0, b = 0, a = 0;
    // tslint:disable-next-line: one-variable-per-declaration
    const height = matrix.height,
      width = matrix.width,
      dim = height * width;
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        r += matrix.data[j][i].r;
        g += matrix.data[j][i].g;
        b += matrix.data[j][i].b;
        a += matrix.data[j][i].a;
      }
    }
    return {
      r: Math.floor(r / dim),
      g: Math.floor(g / dim),
      b: Math.floor(b / dim),
      a: a / dim
    };
  }

  getMatrixMeanColorName(matrix) {
    const color = this.getMatrixMeanColor(matrix);
    return `rgb(${color.r}, ${color.g}, ${color.b})`;
  }

  setMatrixColor(matrix, color, x1, y1, x2, y2) {
    if (!x2 || !y2) {
      matrix.data[y1][x1] = color;
      return;
    }

    for (let y = y1; y < y2; y++) {
      for (let x = x1; x < x2; x++) {
        matrix.data[y][x] = color;
      }
    }
  }

  cropImageMatrix(matrix, x1, y1, x2, y2) {
    x1 = x1 <= 0 ? 0 : x1;
    y1 = y1 <= 0 ? 0 : y1;
    x2 = x2 <= matrix.width ? x2 : matrix.width;
    y2 = y2 <= matrix.height ? y2 : matrix.height;

    const sub = [];
    for (let y = y1; y < y2; y++) {
      const row = [];
      for (let x = x1; x < x2; x++) {
        row.push(matrix.data[y][x]);
      }
      sub.push(row);
    }
    return new ImageMatrix(x2 - x1, y2 - y1, sub);
  }

  invertFilter(imgMatrix) {
    const imgW = imgMatrix.width;
    const imgH = imgMatrix.height;
    const matrix = imgMatrix.data.slice(0);

    for (let y = 0; y < imgH; y++) {
      for (let x = 0; x < imgW; x++) {
        const color = matrix[y][x];
        color.r = 255 - color.r;
        color.g = 255 - color.g;
        color.b = 255 - color.b;
      }
    }

    return new ImageMatrix(imgW, imgH, matrix);
  }

  grayScaleFilter(matrix: ImageMatrix) {
    for (let y = 0; y < matrix.height; y++) {
      for (let x = 0; x < matrix.width; x++) {
        const color = matrix.data[y][x];
        const avg = 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;
        color.r = color.g = color.b = Math.floor(avg);
        matrix.data[y][x] = color;
      }
    }

    return new ImageMatrix(matrix.width, matrix.height, matrix.data);
  }

  blurFilter(imgMatrix) {
    const blurThreshold = 4;
    const imgW = imgMatrix.width;
    const imgH = imgMatrix.height;
    const matrix = imgMatrix.data; //.slice(0);

    for (let y = 0; y < imgH; y++) {
      for (let x = 0; x < imgW; x++) {
        const data = this.cropImageMatrix(imgMatrix, x - blurThreshold, y - blurThreshold, x + blurThreshold, y + blurThreshold);
        const color = this.getMatrixMeanColor(data);
        matrix[y][x] = color;
      }
    }

    return new ImageMatrix(imgW, imgH, matrix);
  }

  pixelateFilter(imgMatrix) {
    // tslint:disable-next-line: one-variable-per-declaration
    const pw = 15,
      ph = 15,
      imgW = imgMatrix.width,
      imgH = imgMatrix.height,
      matrix = imgMatrix;

    for (let j = 0; j < imgH; j = j + ph) {
      for (let i = 0; i < imgW; i = i + pw) {
        // tslint:disable-next-line: one-variable-per-declaration
        const w = i + pw > imgW ? imgW : i + pw,
          h = j + ph > imgH ? imgH : j + ph;
        const data = this.cropImageMatrix(matrix, i, j, w, h);
        const color = this.getMatrixMeanColor(data);
        this.setMatrixColor(matrix, color, i, j, w, h);
      }
    }

    return matrix;
  }

  nullFilter(imgMatrix) {
    return imgMatrix;
  }
}
