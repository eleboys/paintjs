import { ActionCommand } from './action-command.model';
import { SimpleImage } from './simple-image.model';

export interface PaintJsState {
    currentImage: SimpleImage;
    commandStack: ActionCommand[];
    activeCommandId: string;
    inProgress: boolean;
}
