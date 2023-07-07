import { Component, EventEmitter, Input, Output } from '@angular/core';
import { getDiscountAmount, getDiscountedPrice, getFinalPrice } from 'src/assets/cart-utils';


@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent {
  @Input()
  item: any;

  @Input()
  vat = 0;

  @Output('quantityChange')
  onQuantityChange = new EventEmitter<number>();

  constructor() { }

  getDiscountAmount() {
    return getDiscountAmount(this.item.netPrice, this.item.discount)*this.item.quantity;
  }
  getItemPrice() {
    const discountedPrice = getDiscountedPrice(this.item.netPrice, this.item.discount);
    return getFinalPrice(discountedPrice * this.item.quantity, this.vat);
  }

  quantityChange(event: number) {
    this.onQuantityChange.emit(event);
  }

}
