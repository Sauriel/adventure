import { Component, OnInit,ViewChild } from '@angular/core';

import { OverviewService } from '../overview.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  constructor(private overviewService: OverviewService) {
  }

  ngOnInit() {
    this.overviewService.setOverviewComponent(this);
  }
}
