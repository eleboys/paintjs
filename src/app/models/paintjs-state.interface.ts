import { ActionCommand } from './action-command.model';
import { ImageMatrix } from './image-matrix.model';

export interface PaintJsState {
    currentImage: ImageMatrix;
    commandStack: ActionCommand[];
    activeCommandId: string;
}
