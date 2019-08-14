/// <reference lib="webworker" />
import { ImageProcessingService } from './services/image-processing/image-processing.service';
import { ActionCommand } from './models/action-command.model';

const imgProcessService = new ImageProcessingService();

addEventListener('message', onmessage);

function onmessage(e) {
  const command = e.data as ActionCommand;

  const action = actionFactory(command.name);
  const imgMatrix = action(command.matrix);
  postMessage({ matrix: imgMatrix });
}

function actionFactory(name) {
  switch (name) {
    case 'pixelate':
      return imgProcessService.pixelateFilter.bind(imgProcessService);
    case 'invert':
      return imgProcessService.invertFilter.bind(imgProcessService);
    case 'blur':
      return imgProcessService.blurFilter.bind(imgProcessService);
    default:
      return imgProcessService.nullFilter.bind(imgProcessService);
  }
}
