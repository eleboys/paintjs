import { ImageMatrix } from './image-matrix.model';
import { CommandNames } from './command-names.enum';

export class ActionCommand {
    name: CommandNames;
    matrix: ImageMatrix;
    params: any;
    id: string;

    constructor(n: CommandNames, i: string, m: ImageMatrix, p?: any) {
        this.name = n;
        this.matrix = m;
        this.params = p;
        this.id = i;
    }
}
