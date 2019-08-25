import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, SimpleChange } from '@angular/core';

import { PaintJsStore } from 'src/app/services/store/paintjs-store';
import { ImageService } from 'src/app/services/image/image.service';
import { ActionCommand } from 'src/app/models/action-command.model';
import { ActionCommandService } from 'src/app/services/action-command/action-command.service';
import { CommandNames } from 'src/app/models/command-names.enum';
import { Observable } from 'rxjs';

@Component({
  selector: 'pjs-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {

  @ViewChild('fileExplorer', { static: true })
  fileExplorer: ElementRef;

  currentImage$ = this.store.select('currentImage') as Observable<any>;
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
    this.imageService.blobToSimpleImage(files[0]).subscribe(simage => {
      this.store.set('currentImage', simage);
      this.commandService.add(CommandNames.Load);
    });
  }

  save() {
    this.imageService.downloadSimpleImage(this.store.get('currentImage'), 'painjs.png');
  }

  undo() {
    this.commandService.undo();
  }

  redo() {
    this.commandService.redo();
  }

  private subcribeToStoreChanges() {
    this.store.select('commandStack').subscribe((stack: ActionCommand[]) => {
      const i = stack.findIndex(c => c.id === this.store.get('activeCommandId'));
      this.canUndo = i >= 2;
      this.canRedo = i <= (stack.length - 2);
    });
  }
}
