import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CartArticle } from 'src/app/interfaces/cart-article';
import { getDiscountedPrice, getFinalPrice, getTransportFee, getVatAmount } from 'src/utils/cart-utils';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnChanges {
  protected _items: any[] = [];

  @Input()
  get items() {
    return this._items;
  }
  set items(value: CartArticle[] | null) {
    if (!value) {
      value = [];
    }
    this._items = value;
  }

  @Input()
  vat = 0;

  summary = this.updateSummary();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items'] || changes['vat']) {
      this.summary = this.updateSummary();
    }
  }

  private updateSummary() {
    let summary = this._items.reduce((summ, item) => {
      let discountedPrice = getDiscountedPrice(item.netPrice, item.discount) * item.quantity;
      const vatAmount = getVatAmount(discountedPrice, this.vat);
      const weight = item.weight * item.quantity;
      const price = getFinalPrice(discountedPrice, this.vat);

      return {
        netTotal: summ.netTotal + discountedPrice,
        totalVat: summ.totalVat +  vatAmount,
        totalWeight: summ.totalWeight + weight,
        totalPrice: summ.totalPrice + price
      };
    }, { netTotal: 0, totalVat: 0, totalWeight: 0, totalPrice: 0 });

    const transportFee = getTransportFee(summary.totalWeight);

    return {
      ...summary,
      transportFee
    }
  }
}
