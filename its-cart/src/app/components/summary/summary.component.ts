import { Component, Input } from '@angular/core';
import { getDiscountedPrice, getFinalPrice, getTransportFee, getVatAmount } from 'src/cart-utils';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent {
  @Input() items: any[] = [];
  @Input() vat=0;

  summary= this.updateSummary();

  private updateSummary() {
    let summary = this.items.reduce((summ, item) => {
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
    return
    {
      
    }
  }
}
