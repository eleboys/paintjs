import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PaintJsStore } from 'src/app/services/store/paintjs-store';

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

  commandStack$ = this.store.select('commandStack');

  constructor(private store: PaintJsStore,
              private imageService: ImageProcessingService) {
    this.subscribeToObservables(store);
  }

  private subscribeToObservables(store: PaintJsStore) {
    store.select('currentImage').subscribe((matrix: ImageMatrix) => {
      if (!matrix || matrix.width === 0) {
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
