/// <reference lib="webworker" />
import { ImageProcessingService } from './services/image-processing/image-processing.service';
import { ActionCommand } from './models/action-command.model';
import { CommandNames } from './models/command-names.enum';

const imgProcessService = new ImageProcessingService();

addEventListener('message', onmessage);

function onmessage(e) {
  const command = e.data as ActionCommand;

  const action = actionFactory(command.name);
  const imgMatrix = action(command.matrix);
  postMessage({ matrix: imgMatrix, command });
}

function actionFactory(name) {
  switch (name) {
    case CommandNames.Pixelate:
      return imgProcessService.pixelateFilter.bind(imgProcessService);
    case CommandNames.Invert:
      return imgProcessService.invertFilter.bind(imgProcessService);
    case CommandNames.Blur:
      return imgProcessService.blurFilter.bind(imgProcessService);
    default:
      return imgProcessService.nullFilter.bind(imgProcessService);
  }
}
