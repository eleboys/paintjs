import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { PaintJsStore } from 'src/app/services/store/paintjs-store';
import { ImageService } from 'src/app/services/image/image.service';
import { Observable } from 'rxjs';
import { ActionCommand } from 'src/app/models/action-command.model';

@Component({
  selector: 'pjs-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit, AfterViewInit {

  @ViewChild('fileExplorer', { static: true })
  fileExplorer: ElementRef;

  commandStack$: Observable<ActionCommand[]>;

  constructor(private store: PaintJsStore,
              private imageService: ImageService) {
    this.commandStack$ = this.store.select('commandStack');
  }

  ngAfterViewInit() {
    console.log(this.fileExplorer);
  }

  ngOnInit() {
  }

  openFileExplorer() {
    this.fileExplorer.nativeElement.click();
  }

  onFileSelected(ev) {
    const files = this.fileExplorer.nativeElement.files;
    if (!files || !files.length) {
      return;
    }
    this.imageService.blobToImageMatrix(files[0]).subscribe(matrix => {
      this.store.set('currentImage', matrix);
    });
  }
}
