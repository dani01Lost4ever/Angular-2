import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription, map, of, take, timer } from 'rxjs';
import { CartItem } from 'src/app/interfaces/cart-item';
import { Product } from 'src/app/interfaces/product';
import { SideCartUpdateService } from 'src/app/services/side-cart-update.service';
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
  constructor(private sideCartService: SideCartService, private cartUpdateService: SideCartUpdateService, private router: Router) {  }

  private cartUpdateSubscription!: Subscription;
  ngOnInit(): void {
    this.cartItems$ = this.getCart();

    this.cartUpdateSubscription = this.cartUpdateService.cartUpdated$.subscribe(() => {
      this.getCart().subscribe((cartItems) => {
        this.cartItems$ = of(cartItems);
      });
    });
  }

  ngOnDestroy(): void {
    this.cartUpdateSubscription.unsubscribe();
  }

  private getCart(): Observable<CartItem[]> {
    return this.sideCartService.list();
  }

  getPrice(product: Product, quantity: number){
    return getDiscountedPrice(product.netPrice, product.discount)*quantity;
  }

  deleteCartItem(id: string): void {
    this.sideCartService.delete(id).subscribe(() => {
      this.deletedItems.push(id);
      timer(1000)
        .pipe(take(1))
        .subscribe(() => {
          this.deletedItems = this.deletedItems.filter(itemId => itemId !== id);
          this.cartItems$ = this.cartItems$.pipe(
            take(1),
            map((cartItems) => cartItems.filter(item => !this.deletedItems.includes(item.id)))
          );
        });
        this.cartUpdateService.notifyCartUpdated();
    });
  }

  goToCheckout(){
    return this.sideCartService.pushNav();
  }
}
