import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { PreviewAreaComponent } from './preview-area.component';
import { PaintJsStore } from 'src/app/services/store/paintjs-store';
import { AppModule } from 'src/app/app.module';

describe('PreviewAreaComponent', () => {
  let component: PreviewAreaComponent;
  let fixture: ComponentFixture<PreviewAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AppModule ],
      schemas: [ NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
