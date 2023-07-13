import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartItem } from '../interfaces/cart-item';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SideCartService {

  constructor(private http: HttpClient, private router: Router) {   }

  list(){
    return this.http.get<CartItem[]>('/api/cart-items/')
  }

  delete(id: string) {
    return this.http.delete(`/api/cart-items/${ id }`);
  }
  
  pushNav() {
    return this.router.navigate(["/checkout"]);
  }
}
