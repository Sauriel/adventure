import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import {NgbModal, ModalDismissReasons, NgbPopoverConfig} from '@ng-bootstrap/ng-bootstrap';

import { Adventure } from '../model/adventure';
import { Node } from '../model/node';
import { Link } from '../model/link';
import { VariableModification } from '../model/variableModification'
import { Variable } from '../model/variable'
import { Modification } from '../enum/modification.enum'

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
  providers: [NgbPopoverConfig]
})
export class OverviewComponent implements OnInit {
  adventure: Adventure;
  selectedNode: Node;

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term.length < 2 ? [] : this.adventure.variables.filter(v => new RegExp(term, 'gi').test(v.key)).splice(0, 10));

  constructor(private modalService: NgbModal, config: NgbPopoverConfig) {
    config.placement = 'top';
    config.triggers = 'hover';
  }

  ngOnInit() {
    let adventure = new Adventure();
    adventure.title = "Mein Abenteuer";
    adventure.text = "Beschreibung des Abenteuers";
    let start = new Node(0);
    start.title = "Node 1";
    start.text = "Text 1";
    start.r = 30;
    start.setCoordinates(50, 50);
    adventure.nodes.push(start);
    this.fakeNodes(adventure, start, 1, 4, 3);
    this.adventure = adventure;
    this.calculateCoordinates();
  }

  private fakeNodes(adventure: Adventure, parent: Node, level: number, maxLevel: number, count: number) {
    for (let i = 1; i <= count; i++) {
      let node = new Node(level);
      node.title = parent.title + "-" + i;
      node.text = parent.text + "-" + i;
      let link = new Link();
      link.title = "Link: " + parent.title + " -> " + node.title;
      link.source = parent;
      link.target = node;
      let modification = new VariableModification();
      let variable = new Variable();
      variable.key = "TestVariable " + link.title;
      variable.value = "Value";
      adventure.variables.push(variable);
      modification.modificationKey = variable;
      modification.modificationModificator = Modification.ADD;
      modification.modificationValue = "Test";
      link.variableModifications.push(modification);
      adventure.links.push(link);
      adventure.nodes.push(node);
      if (level < maxLevel) {
        this.fakeNodes(adventure, node, level + 1, maxLevel, count);
      }
    }
  }

  private calculateCoordinates() {
    let windowWidth = document.getElementById("overview").clientWidth;

    let currentNodes = new Map();

    for (let node of this.adventure.nodes) {
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
    for (let node of this.adventure.nodes) {
      if (node.depth == level) {
        count++;
      }
    }
    return count;
  }

  getLinksForNode(node: Node) : Link[] {
    let links = new Array();
    for (let link of this.adventure.links) {
      if (link.source == node) {
        links.push(link);
      }
    }
    return links;
  }

  openNodeModal(content, node: Node) {
    this.modalService.open(content);
    this.selectedNode = node;
  }

  getVariableModificators() : Modification[] {
    let allModificators = new Array();
    allModificators.push(Modification.SET);
    allModificators.push(Modification.ADD);
    allModificators.push(Modification.SUBSTRACT);
    return allModificators;
  }
}
