import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discountAmount'
})
export class DiscountAmountPipe implements PipeTransform {

  constructor(private currencyPipe: CurrencyPipe) { }

  transform(value: number): unknown {
    const currencyString = this.currencyPipe.transform(value, '', '');
    return value ? `(-${currencyString} €)` : '';
  }

}
