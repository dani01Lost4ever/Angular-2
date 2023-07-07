import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';
import { CartItem } from 'src/app/interfaces/cart-item';
import { CartSourceService } from 'src/app/services/cart-source.service';
import { VatService } from 'src/app/services/vat.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy{
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
