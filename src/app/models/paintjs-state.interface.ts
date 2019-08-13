import { ActionCommand } from './action-command.model';

export interface PaintJsState {
    currentImage: ImageBitmap;
    commandStack: ActionCommand[];
}
