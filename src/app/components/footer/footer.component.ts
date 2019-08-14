import { Component, OnInit } from '@angular/core';
import { PaintJsStore } from 'src/app/services/store/paintjs-store';

@Component({
  selector: 'pjs-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  currentImage$ = this.store.select('currentImage');

  constructor(private store: PaintJsStore) { }

  ngOnInit() {
  }

}
