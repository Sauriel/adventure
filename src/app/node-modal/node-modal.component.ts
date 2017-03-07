import { Component, OnInit, ViewChild } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

import { AdventureService } from '../adventure.service';
import { OverviewService } from '../overview.service';

import { Adventure } from '../model/adventure';
import { Node } from '../model/node';
import { Link } from '../model/link';
import { Modification } from '../enum/modification.enum'

@Component({
  selector: 'app-node-modal',
  templateUrl: './node-modal.component.html',
  styleUrls: ['./node-modal.component.css']
})
export class NodeModalComponent implements OnInit {
  @ViewChild('nodeModal') nodeModal;
  private currentModal : NgbModalRef;

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term.length < 2 ? [] : this.getAdventure().variables.filter(v => new RegExp(term, 'gi').test(v.key)).splice(0, 10));

  constructor(private adventureService: AdventureService, private overviewService: OverviewService, private modalService: NgbModal) { }

  ngOnInit() {
    this.overviewService.setNodeModalComponent(this);
  }

  openNodeModal() {
    this.currentModal = this.modalService.open(this.nodeModal);
  }

  getLinksForNode(node: Node) : Link[] {
    let links = new Array();
    for (let link of this.getAdventure().links) {
      if (link.source == node) {
        links.push(link);
      }
    }
    return links;
  }

  getVariableModificators() : Modification[] {
    let allModificators = new Array();
    allModificators.push(Modification.SET);
    allModificators.push(Modification.ADD);
    allModificators.push(Modification.SUBSTRACT);
    return allModificators;
  }

  changeTarget(link: Link) {
    this.overviewService.getNodeGraphComponent().setSelectionMode(true);
    this.overviewService.currentLink = link;
    this.currentModal.close();
  }

  addAnswer() {
    let newAnswer = new Link();
    newAnswer.title = "NEW ANSWER";
    newAnswer.source = this.overviewService.selectedNode;
    newAnswer.target = this.overviewService.selectedNode;
    this.getAdventure().links.push(newAnswer);
    this.overviewService.getNodeGraphComponent().setSelectionMode(true);
    this.overviewService.currentLink = newAnswer;
    this.currentModal.close();
  }

  deleteLink(link: Link) {
    let index = this.getAdventure().links.indexOf(link);
    if (index > -1) {
      this.getAdventure().links.splice(index, 1);
    }
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
