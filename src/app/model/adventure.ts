import {Node} from './node'
import {Link} from './link'
import {Variable} from './variable'

export class Adventure {
  title: string;
  text: string;
  variables: Variable[];
  nodes: Node[];
  links: Link[];

  constructor() {
    this.variables = new Array();
    this.nodes = new Array();
    this.links = new Array();
  }
}
