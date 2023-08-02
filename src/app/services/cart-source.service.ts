import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { CartItem } from '../interfaces/cart-item';
import { Product } from '../interfaces/product';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

const CART: CartItem[] = [];

@Injectable({
  providedIn: 'root',
})
export class CartSourceService {
  private _items$ = new BehaviorSubject<CartItem[]>([]);
  items$ = this._items$.asObservable();

  constructor(private http: HttpClient, private authSrv: AuthService) {
    this.authSrv.currentUser$.subscribe((user) => {
      if (user) {
        this.fetch();
      } else {
        this._items$.next([]);
      }
    });
  }

  setQuantity(id: string, quantity: number) {
    this.http
      .patch<CartItem>(`/api/cart-items/${id}`, { quantity })
      .subscribe((updated) => {
        const index = this._items$.value.findIndex((i) => i.id === id);
        const clone = structuredClone(this._items$.value);
        clone[index] = updated;
        this._items$.next(clone);
      });
  }

  fetch() {
    this.http
      .get<CartItem[]>('/api/cart-items')
      .subscribe((items) => this._items$.next(items));
  }

  addToCart(productId: string, quantity: number) {
    return this.http
      .post<CartItem>('/api/cart-items', { productId, quantity })
      .pipe(
        tap((item) => {
          let index = this._items$.value.findIndex((i) => i.id === item.id);

          if (index !== -1) {
            this._items$.value[index].quantity += quantity;
          } else {
            this._items$.value.push(item);
          }

          this._items$.next(this._items$.value);
        })
      );
  }

  deleteFromCart(itemId: string) {
    return this.http.delete<CartItem>('/api/cart-items/' + itemId).pipe(
      tap((item) => {
        let index = this._items$.value.findIndex((i) => i.id === itemId);
        if (index !== -1) {
          this._items$.value.splice(index, 1);
          this._items$.next(this._items$.value);
        }
      })
    );
  }
}
