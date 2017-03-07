import { Component, OnInit } from '@angular/core';

import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';

import { AdventureService } from '../adventure.service';
import { OverviewService } from '../overview.service';

import { Adventure } from '../model/adventure';
import { Node } from '../model/node';
import { Link } from '../model/link';

@Component({
  selector: 'app-node-graph',
  templateUrl: './node-graph.component.html',
  styleUrls: ['./node-graph.component.css'],
  providers: [NgbPopoverConfig]
})
export class NodeGraphComponent implements OnInit {
  nodes: Node[];
  links: Link[];

  constructor(private adventureService: AdventureService, private overviewService: OverviewService, private config: NgbPopoverConfig) {
    config.placement = 'top';
    config.triggers = 'hover';
  }

  ngOnInit() {
    this.overviewService.setNodeGraphComponent(this);
    let adventure = this.getAdventure();
    this.nodes = adventure.nodes;
    this.links = adventure.links;
    this.calculateCoordinates();
  }

  setSelectionMode(value: boolean) {
    this.overviewService.nodeSelectionMode = value;
  }

  private calculateCoordinates() {
    let windowWidth = document.getElementById("overview").clientWidth;
    let currentNodes = new Map();

    for (let node of this.getAdventure().nodes) {
      let level = node.depth;
      let currentNode = currentNodes.get(level);
      if (currentNode === undefined) {
        currentNode = 1;
      }
      let numberOfNodesOnThisLevel = this.getNumberOfNodesForLevel(level);
      let x = (windowWidth / (numberOfNodesOnThisLevel + 1)) * currentNode;
      let y = 50 + (100 * level);
      node.setCoordinates(x, y);
      currentNode++;
      currentNodes.set(level, currentNode);
    }
  }

  private getNumberOfNodesForLevel(level: number) : number {
    let count = 0;
    for (let node of this.getAdventure().nodes) {
      if (node.depth == level) {
        count++;
      }
    }
    return count;
  }

  openNodeModal(node: Node) {
    this.overviewService.selectedNode = node;
    this.overviewService.getNodeModalComponent().openNodeModal();
  }

  createNewNode() {
    let newNode = new Node(this.overviewService.selectedNode.depth + 1);
    newNode.title = "NEW NODE";
    newNode.text = "LOREM IPSUM";
    this.getAdventure().nodes.push(newNode);
    this.overviewService.currentLink.target = newNode;
    this.overviewService.getNodeGraphComponent().setSelectionMode(false);
    this.overviewService.currentLink = null;
    this.overviewService.getNodeModalComponent().openNodeModal();
    this.calculateCoordinates();
  }

  abortChangeTarget() {
    this.overviewService.getNodeGraphComponent().setSelectionMode(false);
    this.overviewService.currentLink = null;
    this.overviewService.getNodeModalComponent().openNodeModal();
  }

  selectNodeAsTarget(node: Node) {
    this.overviewService.currentLink.target = node;
    this.overviewService.getNodeGraphComponent().setSelectionMode(false);
    this.overviewService.currentLink = null;
    this.overviewService.getNodeModalComponent().openNodeModal();
  }

  getSelectedNode() : Node {
    return this.overviewService.selectedNode;
  }

  getCurrentLink() : Link {
    return this.overviewService.currentLink;
  }

  isNodeSelectionMode() : boolean {
    return this.overviewService.nodeSelectionMode;
  }

  getAdventure() : Adventure {
    return this.adventureService.getAdventure();
  }
}
