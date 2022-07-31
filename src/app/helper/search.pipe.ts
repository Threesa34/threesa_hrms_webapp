import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'searchFilter'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val) => {
      let rVal = (String(val.id).toLocaleLowerCase().includes(args)) || (val.prd_unit.toLocaleLowerCase().includes(args));
      return rVal;
    })

  }

}