import { BehaviorSubject, Observable } from 'rxjs';
import { pluck, distinctUntilChanged } from 'rxjs/operators';

import { PaintJsState } from '../../models/paintjs-state.interface';
import { BaseStore } from './base-store';
import { ImageMatrix } from 'src/app/models/image-matrix.model';
import { CommandNames } from 'src/app/models/command-names.enum';

const nullMatrix = new ImageMatrix(0, 0, []);
const state: PaintJsState = {
    currentImage: nullMatrix,
    commandStack: [{ id: 'c0', name: CommandNames.Null, params: null, matrix: nullMatrix }],
    activeCommandId: 'c0'
};

export class PaintJsStore extends BaseStore<PaintJsState> {

    constructor() {
        super();
        this.subject.next(state);
    }

}
