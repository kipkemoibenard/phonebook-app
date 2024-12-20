import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }
  transform<T>(array: T[], direction: 'asc' | 'desc', key: keyof T): T[] {
    if (!array || !key || !direction) {
      return array;
    }

    return [...array].sort((a, b) => {
      const fieldA = a[key]?.toString().toLowerCase() || '';
      const fieldB = b[key]?.toString().toLowerCase() || '';

      if (fieldA < fieldB) {
        return direction === 'asc' ? -1 : 1;
      }
      if (fieldA > fieldB) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

}
