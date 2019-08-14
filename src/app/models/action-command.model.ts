import { ImageMatrix } from './image-matrix.model';

export class ActionCommand {
    name: string;
    matrix: ImageMatrix;
    params: any;

    constructor(n: string, m: ImageMatrix, p?: any) {
        this.name = n;
        this.matrix = m;
        this.params = p;
    }
}
