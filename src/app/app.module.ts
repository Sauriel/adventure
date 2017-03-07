import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AdventureService } from './adventure.service';
import { OverviewService } from './overview.service';

import { AppComponent } from './app.component';
import { OverviewComponent } from './overview/overview.component';
import { ModificationTextPipe } from './modification-text.pipe';
import { NodeModalComponent } from './node-modal/node-modal.component';
import { NodeGraphComponent } from './node-graph/node-graph.component';

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    ModificationTextPipe,
    NodeModalComponent,
    NodeGraphComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot()
  ],
  providers: [
    AdventureService,
    OverviewService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
