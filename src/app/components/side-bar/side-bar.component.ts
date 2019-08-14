import { Component, OnInit } from '@angular/core';

import { ActionCommandService } from 'src/app/services/action-command/action-command.service';
import { CommandNames } from 'src/app/models/command-names.enum';

@Component({
  selector: 'pjs-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  commandNames = CommandNames;

  constructor(private commandService: ActionCommandService) {
  }

  ngOnInit() {
  }

  command(name: CommandNames) {
    this.commandService.execute(name);
  }
}
