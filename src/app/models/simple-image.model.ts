import { Pixel } from './pixel.model';
import { Color } from './color.model';

export class SimpleImage {
    pixels: Array<Pixel>;
    width: number;
    height: number;

    constructor(w, h) {
        this.width = w;
        this.height = h;
        this.pixels = new Array<Pixel>();
        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
                this.pixels[y * w + x] = new Pixel(x, y, new Color(0, 0, 0));
            }
        }
    }

    clone() {
        const sclone = new SimpleImage(this.width, this.height);
        sclone.pixels = this.pixels.slice(0);
        return sclone;
    }

    getPixel(x: number, y: number): Pixel {
        return this.pixels[y * this.width + x];
    }

    getPixels(x1: number, y1: number, x2: number, y2: number): Pixel[] {

        x1 = x1 < 0 ? 0 : x1;
        y1 = y1 < 0 ? 0 : y1;
        y2 = y2 > this.height ? this.height : y2;
        x2 = x2 > this.width ? this.width : x2;

        const pixels = [];
        for (let y = y1; y < y2; y++) {
            for (let x = x1; x < x2; x++) {
                pixels.push(this.getPixel(x, y));
            }
        }
        return pixels;
    }

    setPixelColor(x: number, y: number, color: Color) {
        const pixel = this.getPixel(x, y);
        pixel.color = color;
    }

    setPixelsColor(x1: number, y1: number, x2: number, y2: number, color: Color) {
        const pixels = this.getPixels(x1, y1, x2, y2);
        for (const pixel of pixels) {
            pixel.color = color;
        }
    }
}
