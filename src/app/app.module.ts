import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/app/app.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { PreviewAreaComponent } from './components/preview-area/preview-area.component';
import { FooterComponent } from './components/footer/footer.component';
import { PaintJsStore } from './services/paintjs-store';

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
    PaintJsStore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
