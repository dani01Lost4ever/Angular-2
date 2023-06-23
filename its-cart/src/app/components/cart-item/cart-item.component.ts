import { Component, EventEmitter, Input, Output } from '@angular/core';
import { getDiscountAmount, getDiscountedPrice, getFinalPrice } from 'src/cart-utils';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent {
  @Input()
  item: any;

  @Input()
  vat: number = 0;

  @Output()
  quantityChange = new EventEmitter<number>();

  getItemPrice() {
    const discountedPrice = getDiscountedPrice(this.item.netPrice, this.item.discount);
    return getFinalPrice(discountedPrice * this.item.quantity, this.vat);
  }

  getDiscountAmount() {
    return getDiscountAmount(this.item.netPrice, this.item.discount) * this.item.quantity;
  }

  handleQuantityChange(event:number) {
    console.log("Event: ", event);
    this.quantityChange.emit(event);
  }
}
