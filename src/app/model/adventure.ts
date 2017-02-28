import {Node} from './node'
import {Variable} from './variable'

export class Adventure {
  title: string;
  text: string;
  variables: Variable[];
  start: Node;
}
