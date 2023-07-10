import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { isNil, omitBy } from 'lodash';
import { Observable, map } from 'rxjs';

export interface ProductFilters{
  name?: string|null,
  minPrice?: number|null,
  maxPrice?: number|null
}
export interface AddItemToCart{
  id: string;
  quantity: number;
}
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {   }

  list(filters: ProductFilters){
    const q= omitBy(filters, isNil)
    return this.http.get<Product[]>("/api/products", {params: q});
  }

  count(filters: ProductFilters): Observable<number> {
    // Simulate counting locally based on the filters
    return this.list(filters).pipe(
      map(products => products.length)
    );
  }

  addToCart(productId:string, quantity: number){
    return this.http.post<AddItemToCart>("/api/cart-items", {productId, quantity});
  }
}
