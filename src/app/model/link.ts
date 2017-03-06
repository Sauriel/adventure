import {Node} from './node'
import {VariableModification} from './variableModification'
import {Modification} from '../enum/modification.enum'

export class Link {
  title: string;
  source: Node;
  target: Node;
  variableModifications: VariableModification[];

  constructor() {
    this.variableModifications = new Array();
  }
}
