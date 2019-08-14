import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { PaintJsStore } from 'src/app/services/store/paintjs-store';
import { ImageService } from 'src/app/services/image/image.service';
import { ActionCommand } from 'src/app/models/action-command.model';
import { ActionCommandService } from 'src/app/services/action-command/action-command.service';
import { CommandNames } from 'src/app/models/command-names.enum';

@Component({
  selector: 'pjs-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {

  @ViewChild('fileExplorer', { static: true })
  fileExplorer: ElementRef;

  currentImage$ = this.store.select('currentImage');
  canUndo = false;
  canRedo = false;

  constructor(private store: PaintJsStore,
              private commandService: ActionCommandService,
              private imageService: ImageService) {
    this.subcribeToStoreChanges();
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
      this.commandService.add(CommandNames.Load);
    });
  }

  save() {
    this.imageService.downloadImageMatrix(this.store.value.currentImage, 'painjs.png');
  }

  undo() {
    this.commandService.undo();
  }

  redo() {
    this.commandService.redo();
  }

  private subcribeToStoreChanges() {
    this.store.select('commandStack').subscribe((stack: ActionCommand[]) => {
      const i = stack.findIndex(c => c.id === this.store.value.activeCommandId);
      this.canUndo = i >= 2;
      this.canRedo = i <= (stack.length - 2);
    });
  }
}
