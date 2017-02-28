import {Node} from './node'
import {Variable} from './variable'
import {Modification} from '../enum/modification.enum'

export class Way {
  title: string;
  destination: Node;
  modificationKey: Variable;
  modificationValue;
  modificationMadificator: Modification;
}
