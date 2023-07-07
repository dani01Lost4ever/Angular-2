import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from 'src/app/interfaces/cart-item';
import { getDiscountAmount, getDiscountedPrice, getFinalPrice } from 'src/utils/cart-utils';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent {

  @Input()
  item: CartItem | null = null;

  @Input()
  vat = 0;

  @Output()
  quantityChange = new EventEmitter<number>();

  getItemPrice() {
    const discountedPrice = getDiscountedPrice(this.item!.product.netPrice, this.item!.product.discount);
    return getFinalPrice(discountedPrice * this.item!.quantity, this.vat);
  }

  getDiscountAmount() {
    return getDiscountAmount(this.item!.product.netPrice, this.item!.product.discount) * this.item!.quantity;
  }

  handleQuantityChange(event: number) {
    this.quantityChange.emit(event);
  }
}
