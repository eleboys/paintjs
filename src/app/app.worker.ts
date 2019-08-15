/// <reference lib="webworker" />
import { ImageProcessingService } from './services/image-processing/image-processing.service';
import { ActionCommand } from './models/action-command.model';
import { CommandNames } from './models/command-names.enum';
import { SimpleImage } from './models/simple-image.model';

const imgProcessService = new ImageProcessingService();

addEventListener('message', onmessage);

function onmessage(e) {
  const command = e.data as ActionCommand;

  const action = actionFactory(command.name);
  command.image = Object.assign(new SimpleImage(0, 0), command.image);
  const image = action(command.image);
  postMessage({ image, command });
}

function actionFactory(name) {
  switch (name) {
    case CommandNames.Pixelate:
      return imgProcessService.pixelateFilter.bind(imgProcessService);
    case CommandNames.Invert:
      return imgProcessService.invertFilter.bind(imgProcessService);
    case CommandNames.Blur:
      return imgProcessService.blurFilter.bind(imgProcessService);
    case CommandNames.GrayScale:
      return imgProcessService.grayScaleFilter.bind(imgProcessService);
    default:
      return imgProcessService.nullFilter.bind(imgProcessService);
  }
}
