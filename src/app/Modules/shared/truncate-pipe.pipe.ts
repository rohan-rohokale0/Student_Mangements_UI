import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncatePipe',
  standalone: true
})
export class TruncatePipePipe implements PipeTransform {

  transform(value: string, limit: number = 120): string {
    return value.length > limit ? `${value.substring(0, limit)}...` : value;
  }
}
