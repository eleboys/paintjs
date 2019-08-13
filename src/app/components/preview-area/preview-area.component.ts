import { Component, OnInit } from '@angular/core';
import { PaintJsStore } from 'src/app/services/paintjs-store';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { ActionCommand } from 'src/app/models/action-command.model';

@Component({
  selector: 'pjs-preview-area',
  templateUrl: './preview-area.component.html',
  styleUrls: ['./preview-area.component.scss']
})
export class PreviewAreaComponent implements OnInit {

  commandStack$: Observable<ActionCommand[]>;

  constructor(private store: PaintJsStore) {
    this.commandStack$ = store.select('commandStack');
  }

  ngOnInit() {
  }

  addCommand() {
    const v = this.store.value.commandStack;
    v.push({name: 'new' + v.length, params: null});
    // this.store.set('commandStack', v);
  }

}
