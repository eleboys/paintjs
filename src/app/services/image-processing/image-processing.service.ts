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


  calculateMeanColor(pixels: Pixel[]): Color {
    // tslint:disable-next-line: one-variable-per-declaration
    let r = 0, g = 0, b = 0;

    for (const p of pixels) {
      r += p.color.r;
      g += p.color.g;
      b += p.color.b;
    }

    return new Color(
      Math.floor(r / pixels.length),
      Math.floor(g / pixels.length),
      Math.floor(b / pixels.length)
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

  blurFilter(simage: SimpleImage): SimpleImage{
    const blurThreshold = 4;

    for (let y = 0; y < simage.height; y++) {
      for (let x = 0; x < simage.width; x++) {
        const data = simage.getPixels(x - blurThreshold, y - blurThreshold, x + blurThreshold, y + blurThreshold);
        const color = this.calculateMeanColor(data);
        simage.setPixelColor(x, y, color);
      }
    }

    return simage;
  }

  pixelateFilter(simage: SimpleImage): SimpleImage {
    // tslint:disable-next-line: one-variable-per-declaration
    const pw = 15,
      ph = 15;

    for (let j = 0; j < simage.height; j = j + ph) {
      for (let i = 0; i < simage.width; i = i + pw) {
        // tslint:disable-next-line: one-variable-per-declaration
        const w = i + pw > simage.width ? simage.width : i + pw,
          h = j + ph > simage.height ? simage.height : j + ph;
        const data = simage.getPixels(i, j, w, h);
        const color = this.calculateMeanColor(data);
        simage.setPixelsColor(i, j, w, h, color);
      }
    }

    return simage;
  }

  nullFilter(simage: SimpleImage): SimpleImage {
    return simage;
  }
}
