import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PaintJsStore } from 'src/app/services/store/paintjs-store';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { ActionCommand } from 'src/app/models/action-command.model';
import { ImageService } from 'src/app/services/image/image.service';
import { ImageMatrix } from 'src/app/models/image-matrix.model';
import { ImageProcessingService } from 'src/app/services/image-processing/image-processing.service';

@Component({
  selector: 'pjs-preview-area',
  templateUrl: './preview-area.component.html',
  styleUrls: ['./preview-area.component.scss']
})
export class PreviewAreaComponent implements OnInit {

  @ViewChild('previewCanvas', {static: true})
  canvasRef: ElementRef;

  commandStack$: Observable<ActionCommand[]>;

  constructor(private store: PaintJsStore,
              private sanitizer: DomSanitizer,
              private imageService: ImageProcessingService) {
    this.commandStack$ = store.select('commandStack');
    store.select<ImageMatrix>('currentImage').subscribe(matrix => {
      if (!matrix) {
        return;
      }

      const canvas = (this.canvasRef.nativeElement as HTMLCanvasElement);
      canvas.width = matrix.width;
      canvas.height = matrix.height;
      const ctx = canvas.getContext('2d');
      ctx.putImageData(this.imageService.matrixToImageData(matrix), 0, 0);
    });
  }

  ngOnInit() {
  }
}
