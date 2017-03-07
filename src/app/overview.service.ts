import { Injectable } from '@angular/core';

import { NodeGraphComponent } from './node-graph/node-graph.component';
import { NodeModalComponent } from './node-modal/node-modal.component';
import { OverviewComponent } from './overview/overview.component';

import { Adventure } from './model/adventure';
import { Node } from './model/node';
import { Link } from './model/link';

@Injectable()
export class OverviewService {
  selectedNode: Node;
  nodeSelectionMode = false;
  currentLink: Link;

  private overviewComponent: OverviewComponent;
  private graphComponent: NodeGraphComponent;
  private modalComponent: NodeModalComponent;

  constructor() { }

  setOverviewComponent(overviewComponent: OverviewComponent) {
    this.overviewComponent = overviewComponent;
  }

  getOverviewComponent() : OverviewComponent {
    return this.overviewComponent;
  }

  setNodeGraphComponent(graphComponent: NodeGraphComponent) {
    this.graphComponent = graphComponent;
  }

  getNodeGraphComponent() : NodeGraphComponent {
    return this.graphComponent;
  }

  setNodeModalComponent(modalComponent: NodeModalComponent) {
    this.modalComponent = modalComponent;
  }

  getNodeModalComponent() : NodeModalComponent {
    return this.modalComponent;
  }
}
