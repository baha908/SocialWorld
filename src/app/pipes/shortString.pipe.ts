import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortString',
})
export class ShortStringPipe implements PipeTransform {
  transform(value: string, limit: number): any {
    if (value.length > limit) {
      return value.slice(0, limit - 2) + '...';
    }
    return value;
  }
}
