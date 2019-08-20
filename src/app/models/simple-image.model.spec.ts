import { Pixel } from './pixel.model';
import { Color } from './color.model';
import { SimpleImage } from './simple-image.model';

describe('SimpleImage Model', () => {
    const pixels = [
        new Pixel(0, 0, new Color(10, 10, 10)),
        new Pixel(1, 0, new Color(20, 20, 20)),
        new Pixel(0, 1, new Color(30, 30, 30)),
        new Pixel(1, 1, new Color(40, 40, 40))
      ];
    let simage: SimpleImage;

    beforeEach(() => {
        simage = new SimpleImage(2, 2);
        simage.pixels = pixels;
    });

    it('should costructor create SimpleImage object', () => {
        expect(simage).toBeTruthy();
    });

    it('getPixel should return correct data', () => {
        const pixel = simage.getPixel(0, 1);
        expect(pixel).toEqual(pixels[2]);
    });

    it('getPixels should return correct data', () => {
        const px = simage.getPixels(1, 0, 2, 2);

        expect(px).toBeTruthy();
        expect(px.length).toEqual(2);
        expect(px).toEqual(jasmine.arrayWithExactContents([
            pixels[1], pixels[3]
        ]));
    });

    it('should setPixel color correctly', () => {
        simage.setPixelColor(1, 1, new Color(1, 1, 1));
        const pixel = simage.getPixel(1, 1);
        expect(pixel.color).toEqual(new Color(1, 1, 1));
    });

    it('should setPixels color correctly', () => {
        simage.setPixelsColor(1, 0, 2, 2, new Color(1, 1, 1));
        const pixel = simage.getPixel(1, 1);
        expect(pixel.color).toEqual(new Color(1, 1, 1));
    });

    it('should clone object', () => {
        const clone = simage.clone();

        expect(clone.height).toEqual(2);
        expect(clone.width).toEqual(2);
        expect(clone.pixels).toEqual(jasmine.arrayWithExactContents(pixels));
    });
});
