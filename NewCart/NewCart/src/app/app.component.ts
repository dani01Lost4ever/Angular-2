import { Component } from '@angular/core';
import { getDiscountAmount, getDiscountedPrice, getFinalPrice, getVat } from '../assets/cart-utils';

const CART = [
  {
    id: 1,
    name: 'ssd',
    netPrice: 95,
    weight: 100,
    discount: 5,
    quantity: 2
  },
  {
    id: 2,
    name: 'motherboard',
    netPrice: 270,
    weight: 900,
    discount: 0,
    quantity: 1
  },
  {
    id: 3,
    name: 'ram',
    netPrice: 120,
    weight: 60,
    discount: 10,
    quantity: 2
  },
  {
    id: 4,
    name: 'processor',
    netPrice: 400,
    weight: 130,
    discount: 0,
    quantity: 1
  },
  {
    id: 5,
    name: 'power supply',
    netPrice: 130,
    weight: 1400,
    discount: 15,
    quantity: 1
  },
  {
    id: 6,
    name: 'cpu cooler',
    netPrice: 170,
    weight: 1000,
    discount: 23,
    quantity:1
  },
  {
    id: 7,
    name: 'gpu',
    netPrice: 1600,
    weight: 2500,
    discount: 0,
    quantity: 1
  },
  {
    id: 8,
    name: 'case',
    netPrice: 130,
    weight: 3500,
    discount: 30,
    quantity: 1
  }
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items = CART;
  vat = getVat('IT');

  changeQuantity(item: any, newQuantity: number) {
    const index = this.items.indexOf(item);
    const clone = structuredClone(this.items);
    clone[index].quantity = newQuantity;
    this.items = clone;
  }

  trackById(_: number, item: any) {
    return item.id;
  }
}

