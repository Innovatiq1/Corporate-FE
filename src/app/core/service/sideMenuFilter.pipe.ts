import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sideMenuFilter'
})
export class SideMenuFilterPipe implements PipeTransform {
  transform(array: any[], filterBy: boolean): any[] {
    // if (!array || !filterBy) {
    //   return array;
    // }
    return array.filter(item =>   Object.hasOwn(item, "isAction") ? item?.isAction === filterBy:true );
    // return array.filter(item => item.title.toLowerCase().includes(filterBy()));
  }
}
