import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { PaintJsStore } from 'src/app/services/store/paintjs-store';

@Component({
  selector: 'pjs-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  currentImage$ = this.store.select('currentImage') as Observable<any>;

  constructor(private store: PaintJsStore) { }

  ngOnInit() {
  }

}
