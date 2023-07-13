import { animate, query, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { take, timer } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { CartSourceService } from 'src/app/services/cart-source.service';
import { SideCartUpdateService } from 'src/app/services/side-cart-update.service';
import { SideCartService } from 'src/app/services/side-cart.service';
import { getDiscountedPrice } from 'src/utils/cart-utils';

@Component({
  selector: 'app-side-cart',
  templateUrl: './side-cart.component.html',
  styleUrls: ['./side-cart.component.css'],
  animations: [
    trigger('fadeAnimation', [
      transition(':leave', [
        query('.card-footer', [
          style({display: 'block'})
        ]),
        style({ opacity: 1 }),
        animate('1.0s ease-out', style({ opacity: 0 }))
      ]),
    ]),
    trigger('blockExitAnimation', [
      transition(':leave', [])
    ]),
    trigger('enterAnimation', [
      transition(':enter', [
        style({ opacity: 1 }),
        animate('1.5s ease-in-out', style({ opacity: 0 }))
      ]),
    ])
  ]
})
export class SideCartComponent {
  cartItems$= this.cartSS.items$;
  deletedItems: string[] = [];
  constructor(private sideCartService: SideCartService, private cartUpdateService: SideCartUpdateService, private router: Router, private cartSS: CartSourceService) {  }

  // private getCart(): Observable<CartItem[]> {
  //   return this.sideCartService.list();
  // }

  getPrice(product: Product, quantity: number){
    return getDiscountedPrice(product.netPrice, product.discount)*quantity;
  }

  deleteCartItem(id: string): void {
    this.cartSS.deleteFromCart(id).subscribe(() => {
      this.deletedItems.push(id);
      //this.deleteClicked = true;
      timer(1000)
        .pipe(take(1))
        .subscribe(() => {
          console.log("delete", this.deletedItems)
          this.deletedItems = this.deletedItems.filter(itemId => itemId !== id);
          });
    });
  }

  goToCheckout(){
    return this.sideCartService.pushNav();
  }
}
