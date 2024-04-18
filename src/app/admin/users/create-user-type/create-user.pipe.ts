import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayFilter'
})
export class ArrayFilterPipe implements PipeTransform {
  transform(array: any[], filterBy: boolean): any[] {
    // if (!array || !filterBy) {
    //   return array;
    // }
    return array.filter(item =>   item?.isAction === filterBy );
    // return array.filter(item => item.title.toLowerCase().includes(filterBy()));
  }
}
