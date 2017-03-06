import {Variable} from './variable'
import {Modification} from '../enum/modification.enum'

export class VariableModification {
  modificationKey: Variable;
  modificationValue;
  modificationModificator: Modification;
}
