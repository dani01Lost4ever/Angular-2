import { Component } from '@angular/core';
import { CartSourceService } from './services/cart-source.service';
import { VatService } from './services/vat.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  region = 'IT';
  items = this.cartSource.getCart();
  vat = this.setVat(this.region);

  constructor(private cartSource: CartSourceService, private vatSource: VatService) {}

  setVat(region: string){
    let v = 0;
    this.vatSource.setCountry(region);
    this.vatSource.vat$.subscribe(value => {
      v = value;
    })
    return v;
  }


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

