import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'listfilter',
    pure: false
})
export class ListFilterPipe implements PipeTransform {
    transform(items: any[], filter: any): any {
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        if(typeof filter == 'object')
        {
            var key = Object.keys(filter);
            if(key != undefined && key.length > 0)
            {
                return items.filter(item => item[key[0]].indexOf(filter[key[0]]) !== -1);
            }
        }
        else
        {
            return items.filter(item => JSON.stringify(item).toLowerCase().includes(filter));
        }
    }
}