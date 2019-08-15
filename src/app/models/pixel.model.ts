import { Color } from './color.model';

export class Pixel {
    x: number;
    y: number;
    color: Color;

    constructor(x: number, y: number, color?: Color) {
        this.x = x;
        this.y = y;
        this.color = color;
    }
}
