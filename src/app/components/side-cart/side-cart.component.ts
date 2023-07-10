import { Component, OnInit } from '@angular/core';
import { Observable, map, take, timer } from 'rxjs';
import { CartItem } from 'src/app/interfaces/cart-item';
import { Product } from 'src/app/interfaces/product';
import { SideCartService } from 'src/app/services/side-cart.service';
import { getDiscountedPrice } from 'src/utils/cart-utils';

@Component({
  selector: 'app-side-cart',
  templateUrl: './side-cart.component.html',
  styleUrls: ['./side-cart.component.css']
})
export class SideCartComponent implements OnInit{

  cartItems$!: Observable<CartItem[]>;
  deletedItems: string[] = [];
  constructor(private sideCartService: SideCartService) {}

  ngOnInit(): void {
    this.cartItems$ = this.getCart();
  }

  private getCart(): Observable<CartItem[]> {
    return this.sideCartService.list();
  }

  getPrice(product: Product, quantity: number){
    return getDiscountedPrice(product.netPrice, product.discount)*quantity;
  }

  /*
  deleteCartItem(cartItem: CartItem): void {
    this.sideCartService.delete(cartItem.id).subscribe(() => {
      this.cartItems$ = this.cartItems$.pipe(
        take(1),
        map((cartItems) => cartItems.filter(item => item.id !== cartItem.id)),
      );
    });
  }*/
  deleteCartItem(id: string): void {
    this.sideCartService.delete(id).subscribe(() => {
      this.deletedItems.push(id);
      timer(2000)
        .pipe(take(1))
        .subscribe(() => {
          this.deletedItems = this.deletedItems.filter(itemId => itemId !== id);
          this.cartItems$ = this.cartItems$.pipe(
            take(1),
            map((cartItems) => cartItems.filter(item => !this.deletedItems.includes(item.id)))
          );
        });
    });
  }
}
