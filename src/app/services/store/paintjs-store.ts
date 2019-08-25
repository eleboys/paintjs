
import { PaintJsState } from '../../models/paintjs-state.interface';
import { BaseStore } from './base-store';
import { CommandNames } from 'src/app/models/command-names.enum';
import { SimpleImage } from 'src/app/models/simple-image.model';

const nullImage = new SimpleImage(0, 0);
const state: PaintJsState = {
    currentImage: nullImage,
    commandStack: [{ id: 'c0', name: CommandNames.Null, params: null, image: nullImage }],
    activeCommandId: 'c0',
    inProgress: false
};

export class PaintJsStore extends BaseStore<PaintJsState> {

    constructor() {
        super(state);
    }

}
