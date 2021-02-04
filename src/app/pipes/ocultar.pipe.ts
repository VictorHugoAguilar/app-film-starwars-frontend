import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'ocultar' })
export class Ocultar implements PipeTransform {
  transform(value: string): string {
    const largo = value.length;
    var newStr: string = '';
    for (let i = 0; i < largo; i++) {
      newStr += '*';
    }
    return newStr;
  }
}
