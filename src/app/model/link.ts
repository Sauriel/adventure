import {Node} from './node'
import {Variable} from './variable'
import {Modification} from '../enum/modification.enum'

export class Link {
  title: string;
  source: Node;
  destination: Node;
  modificationKey: Variable;
  modificationValue;
  modificationMadificator: Modification;
}
