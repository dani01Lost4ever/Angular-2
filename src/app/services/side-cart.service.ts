import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartItem } from '../interfaces/cart-item';

@Injectable({
  providedIn: 'root'
})
export class SideCartService {

  constructor(private http: HttpClient) {   }

  list(){
    return this.http.get<CartItem[]>("/api/cart-items/");
  }

  delete(id: string) {
    return this.http.delete(`/api/cart-items/${ id }`);
  }
}
