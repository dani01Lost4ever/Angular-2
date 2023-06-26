import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const CART = [
  {
    id: '1',
    name: 'ssd',
    netPrice: 95,
    weight: 100,
    discount: 5,
    quantity: 2
  },
  {
    id: '2',
    name: 'motherboard',
    netPrice: 270,
    weight: 900,
    discount: 0,
    quantity: 1
  },
  {
    id: '3',
    name: 'ram',
    netPrice: 120,
    weight: 60,
    discount: 10,
    quantity: 2
  },
  {
    id: '4',
    name: 'processor',
    netPrice: 400,
    weight: 130,
    discount: 0,
    quantity: 1
  },
  {
    id: '5',
    name: 'power supply',
    netPrice: 130,
    weight: 1400,
    discount: 15,
    quantity: 1
  },
  {
    id: '6',
    name: 'cpu cooler',
    netPrice: 170,
    weight: 1000,
    discount: 23,
    quantity:1
  },
  {
    id: '7',
    name: 'gpu',
    netPrice: 1600,
    weight: 2500,
    discount: 0,
    quantity: 1
  },
  {
    id: '8',
    name: 'case',
    netPrice: 130,
    weight: 3500,
    discount: 30,
    quantity: 1
  }
];

@Injectable({
  providedIn: 'root'
})

export class CartSourceService {
  getCart() {
    return [...CART];
  }

  private items = new BehaviorSubject<any[]>([...CART]);
  items$ = this.items.asObservable();

  setQuantity(id: number, quantity: number) {
    const index = this.items.value.findIndex(i => i.id === id);
    const clone = structuredClone(this.items.value);
    clone[index].quantity = quantity;
    this.items.next(clone);
  }

  addArticle(article: any, quantity: number) {
    const clone = structuredClone(this.items.value);
    clone.push({
      ...article,
      quantity
    });
    this.items.next(clone);
  }
}
