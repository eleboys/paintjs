import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/app/app.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { PreviewAreaComponent } from './components/preview-area/preview-area.component';
import { FooterComponent } from './components/footer/footer.component';
import { PaintJsStore } from './services/store/paintjs-store';
import { ImageService } from './services/image/image.service';
import { WebWorkerService } from './services/web-worker/web-worker.service';
import { ImageProcessingService } from './services/image-processing/image-processing.service';
import { ActionCommandService } from './services/action-command/action-command.service';

@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    SideBarComponent,
    PreviewAreaComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    PaintJsStore,
    ImageService,
    ImageProcessingService,
    WebWorkerService,
    ActionCommandService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
