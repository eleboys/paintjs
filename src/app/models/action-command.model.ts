import { CommandNames } from './command-names.enum';
import { SimpleImage } from './simple-image.model';

export class ActionCommand {
    name: CommandNames;
    image: SimpleImage;
    params: any;
    id: string;

    constructor(n: CommandNames, i: string, m: SimpleImage, p?: any) {
        this.name = n;
        this.image = m;
        this.params = p;
        this.id = i;
    }
}
