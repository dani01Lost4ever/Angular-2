import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../interfaces/cart-item';
import { Product } from '../interfaces/product';
import { HttpClient } from '@angular/common/http';

const CART: CartItem[] = [];

@Injectable({
  providedIn: 'root'
})
export class CartSourceService {
  private _items$ = new BehaviorSubject<CartItem[]>([]);
  items$ = this._items$.asObservable();

  constructor(private http: HttpClient){
    this.fetch();
  }

  setQuantity(id: string, quantity: number) {
    this.http.patch<CartItem>(`/api/cart-items/${id}`, {quantity}).subscribe(updated=>
      {
        const index = this._items$.value.findIndex(i => i.id === id);
        const clone = structuredClone(this._items$.value);
        clone[index]= updated;
        this._items$.next(clone);
      });
  }

  fetch() {
    this.http.get<CartItem[]>('/api/cart-items').subscribe(items=>this._items$.next(items));
  }
}
