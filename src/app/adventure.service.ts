import { Injectable } from '@angular/core';

import { Adventure } from './model/adventure';
import { Node } from './model/node';

@Injectable()
export class AdventureService {

  private adventure: Adventure;

  constructor() {
  }

  getAdventure() : Adventure {
    return this.adventure != null ? this.adventure : this.createNewAdventure();
  }

  createNewAdventure() : Adventure {
    let adventure = new Adventure();
    adventure.title = "MY ADVENTURE";
    adventure.text = "ADVENTURE TIME!";
    let start = new Node(0);
    start.title = "START";
    start.text = "TEXT";
    start.r = 30;
    start.setCoordinates(50, 50);
    adventure.nodes.push(start);
    this.adventure = adventure;
    return adventure;
  }

}
