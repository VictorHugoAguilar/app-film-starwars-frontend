import { coerceStringArray } from '@angular/cdk/coercion';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cortar'
})
export class CortarPipe implements PipeTransform {
  transform(value: string, args?: any): string {
    if (args != null) {
      const tam = args as number;
      return value.substr(0, tam) + '...';
    }

    return value.substr(0, 50) + '...';
  }
}
