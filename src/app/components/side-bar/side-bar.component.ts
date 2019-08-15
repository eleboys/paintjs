import { Component, OnInit } from '@angular/core';

import { ActionCommandService } from 'src/app/services/action-command/action-command.service';
import { CommandNames } from 'src/app/models/command-names.enum';

@Component({
  selector: 'pjs-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  commands = [{
    id: CommandNames.Pixelate,
    name: 'Pixelate'
  }, {
    id: CommandNames.Blur,
    name: 'Blur'
  }, {
    id: CommandNames.Invert,
    name: 'Invert'
  }, {
    id: CommandNames.GrayScale,
    name: 'Gray Scale'
  }, {
    id: CommandNames.Sharpen,
    name: 'Sharpen'
  }, {
    id: CommandNames.ThreeD,
    name: '3D'
  }];

  constructor(private commandService: ActionCommandService) {
  }

  ngOnInit() {
  }

  command(name: CommandNames) {
    this.commandService.execute(name);
  }
}
