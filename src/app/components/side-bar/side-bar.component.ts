import { Component, OnInit } from '@angular/core';
import { WebWorkerService } from 'src/app/services/web-worker/web-worker.service';
import { PaintJsStore } from 'src/app/services/store/paintjs-store';
import { ActionCommandService } from 'src/app/services/action-command/action-command.service';

@Component({
  selector: 'pjs-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  constructor(private commandService: ActionCommandService) {
  }

  ngOnInit() {
  }

  command(name: string) {
    this.commandService.executeCommand(name);
  }
}
