import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { PaintJsStore } from 'src/app/services/store/paintjs-store';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { ImageProcessingService } from 'src/app/services/image-processing/image-processing.service';
import { SimpleImage } from 'src/app/models/simple-image.model';

@Component({
  selector: 'pjs-preview-area',
  templateUrl: './preview-area.component.html',
  styleUrls: ['./preview-area.component.scss']
})
export class PreviewAreaComponent implements OnInit, OnDestroy {

  @ViewChild('previewCanvas', {static: true})
  canvasRef: ElementRef;
  unsubscribe = new Subject<void>();

  commandStack$ = this.store.select('commandStack');
  inProgress$ = this.store.select('inProgress');

  constructor(private store: PaintJsStore,
              private imageService: ImageProcessingService) {
    this.subscribeToObservables(store);
  }

  private subscribeToObservables(store: PaintJsStore) {
    store.select('currentImage')
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((simage: SimpleImage) => {
      if (!simage || simage.width === 0) {
        return;
      }
      const canvas = (this.canvasRef.nativeElement as HTMLCanvasElement);
      canvas.width = simage.width;
      canvas.height = simage.height;
      const ctx = canvas.getContext('2d');
      ctx.putImageData(this.imageService.simpleImageToImageData(simage), 0, 0);
    });
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
