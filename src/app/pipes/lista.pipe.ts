import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lista'
})
export class ListaPipe implements PipeTransform {
  transform(value: string): string[] {
    const lista = value.split(',');
    return lista;
  }
}
