import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discountAmount'
})
export class DiscountAmountPipe implements PipeTransform {

  constructor(private currency: CurrencyPipe) {}

  transform(value: number): unknown {
    const currencyString = this.currency.transform(value, '', '');
    return value ? `(-${currencyString})` : '';
  }
}
