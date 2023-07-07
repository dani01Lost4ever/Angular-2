import { Component, OnInit } from '@angular/core';
import { getDiscountAmount, getDiscountedPrice, getFinalPrice } from 'src/utils/cart-utils';
import { CartSourceService } from './services/cart-source.service';
import { VatService } from './services/vat.service';
import { CartItem } from './interfaces/cart-item';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  items$ = this.cartService.items$;
  vat$ = this.vatService.vat$;
  private updateQuantity$= new Subject<{id: string, quantity: number}>();
  private destryed$ = new Subject<void>();

  constructor(private cartService: CartSourceService,
              private vatService: VatService) {
  }

  ngOnInit(): void {
    this.cartService.fetch();
    let country = 'IT';

    this.updateQuantity$.pipe(
      debounceTime(200)
    ).subscribe(data=>this.cartService.setQuantity(data.id, data.quantity));
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destryed$.next();
    this.destryed$.complete();
  }

  updateQuantity(item: CartItem, quantity: number) {
    //this.cartService.setQuantity(item.id, quantity);
    this.updateQuantity$.next({id: item.id, quantity});
  }

  trackById(_: number, item: CartItem) {
    return item.id;
  }
}

