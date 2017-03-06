import { Pipe, PipeTransform } from '@angular/core';

import { Modification } from './enum/modification.enum'

@Pipe({
  name: 'modificationText'
})
export class ModificationTextPipe implements PipeTransform {

  transform(value: Modification): String {
    return Modification[value];
  }

}
