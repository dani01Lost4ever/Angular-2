import { Component } from '@angular/core';
import { CartSourceService } from './services/cart-source.service';
import { getDiscountAmount, getDiscountedPrice, getFinalPrice } from 'src/utils/cart-utils';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items = this.cartSource.getCart();
  vat = 0;

  constructor(private cartSource: CartSourceService) {}


  updateQuantity(item: any, quantity: number) {
    const index = this.items.indexOf(item);
    const clone = structuredClone(this.items);
    clone[index].quantity = quantity;

    this.items = clone;
  }

  trackById(_: number, item: any) {
    return item.id;
  }
}

