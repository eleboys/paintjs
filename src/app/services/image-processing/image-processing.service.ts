import { ImageMatrix } from 'src/app/models/image-matrix.model';
import { SimpleImage } from 'src/app/models/simple-image.model';
import { Color } from 'src/app/models/color.model';
import { Pixel } from 'src/app/models/pixel.model';

export class ImageProcessingService {

  constructor() { }

  simpleImageToImageData(image: SimpleImage) {
    const data = new Uint8ClampedArray(image.width * image.height * 4);
    for (let y = 0; y < image.height; y++) {
      for (let x = 0; x < image.width; x++) {
        const color = image.getPixel(x, y).color;
        data[x * 4 + y * image.width * 4 + 0] = (color.r);
        data[x * 4 + y * image.width * 4 + 1] = (color.g);
        data[x * 4 + y * image.width * 4 + 2] = (color.b);
        data[x * 4 + y * image.width * 4 + 3] = 255;
      }
    }

    return new ImageData(data, image.width, image.height);
  }


  imageDataToSimpleImage(imgData): SimpleImage {
    const simage = new SimpleImage(imgData.width, imgData.height);
    for (let y = 0; y < imgData.height; y++) {
      for (let x = 0; x < imgData.width; x++) {
        const i = x * 4 + y * imgData.width * 4;
        simage.setPixelColor(x, y, new Color(
          imgData.data[i],
          imgData.data[i + 1],
          imgData.data[i + 2],
        ));
      }
    }
    return simage;
  }


  calculateMeanColor(pixels: Pixel[], weights: number[]): Color {
    // tslint:disable-next-line: one-variable-per-declaration
    let r = 0, g = 0, b = 0;
    const pl = pixels.length;
    const wl = weights.length;

    for (let i = 0; i < pixels.length; i++) {
      const p = pixels[i];
      const w = wl > pl ? (1 / pl) : weights[i];
      r += p.color.r * w;
      g += p.color.g * w;
      b += p.color.b * w;
    }

    return new Color(
      Math.min(Math.max(Math.floor(r), 0), 255),
      Math.min(Math.max(Math.floor(g), 0), 255),
      Math.min(Math.max(Math.floor(b), 0), 255)
    );
  }

  invertFilter(simage: SimpleImage): SimpleImage {
    for (let y = 0; y < simage.height; y++) {
      for (let x = 0; x < simage.width; x++) {
        const color = simage.getPixel(x, y).color;
        color.r = 255 - color.r;
        color.g = 255 - color.g;
        color.b = 255 - color.b;
      }
    }

    return simage;
  }

  grayScaleFilter(simage: SimpleImage): SimpleImage {
    for (let y = 0; y < simage.height; y++) {
      for (let x = 0; x < simage.width; x++) {
        const color = simage.getPixel(x, y).color;
        const avg = 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;
        color.r = color.g = color.b = Math.floor(avg);
      }
    }

    return simage;
  }

  private convolute(simage: SimpleImage, weights: number[], mix: number) {
    const side = Math.round(Math.sqrt(weights.length));
    const halfSide = Math.floor(side / 2);
    const dstImage = new SimpleImage(simage.width, simage.height);

    for (let y = 0; y < simage.height; y++) {
      for (let x = 0; x < simage.width; x++) {
        const data = simage.getPixels(x - halfSide, y - halfSide, x + halfSide + 1, y + halfSide + 1);
        const color = this.calculateMeanColor(data, weights);
        const scolor = simage.getPixel(x, y).color;
        color.r = color.r * mix + scolor.r * (1 - mix);
        color.g = color.g * mix + scolor.g * (1 - mix);
        color.b = color.b * mix + scolor.b * (1 - mix);
        dstImage.setPixelColor(x, y, color);
      }
    }

    return dstImage;
  }

  blurFilter(simage: SimpleImage): SimpleImage {
    return this.convolute(simage, Array(25).fill(1 / 25), 1);
  }

  sharpenFilter(simage: SimpleImage): SimpleImage {
    const weights = [0, -1,  0, -1,  5, -1, 0, -1,  0];
    return this.convolute(simage, weights, 1);
  }

  threeDFilter(simage: SimpleImage): SimpleImage {
    const weights = [1, 1,  1, 1,  0.7, -1, -1, -1,  -1];
    return this.convolute(simage, weights, 1);
  }

  pixelateFilter(simage: SimpleImage): SimpleImage {
    // tslint:disable-next-line: one-variable-per-declaration
    const pw = 15,
          ph = 15,
          weights = Array(pw * ph).fill(1 / (pw * ph));

    for (let j = 0; j < simage.height; j = j + ph) {
      for (let i = 0; i < simage.width; i = i + pw) {
        const data = simage.getPixels(i, j, i + pw, j + ph);
        const color = this.calculateMeanColor(data, weights);
        simage.setPixelsColor(i, j, i + pw, j + ph, color);
      }
    }

    return simage;
  }

  nullFilter(simage: SimpleImage): SimpleImage {
    return simage;
  }
}
