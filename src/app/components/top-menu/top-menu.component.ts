import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, SimpleChange, OnDestroy } from '@angular/core';
import { Observable, combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
export class TopMenuComponent implements OnInit, OnDestroy {

  @ViewChild('fileExplorer', { static: true })
  fileExplorer: ElementRef;
  unsubscribe = new Subject<void>();

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
    const commandStack$ = this.store.select('commandStack');
    const activeCommandId$ = this.store.select('activeCommandId');
    combineLatest(commandStack$, activeCommandId$)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((value: [ActionCommand[], string]) => {
      const i = value[0].findIndex(c => c.id === value[1]);
      this.canUndo = i >= 2;
      this.canRedo = i <= (value[0].length - 2);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
