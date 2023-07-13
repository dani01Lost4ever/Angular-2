import { Component, EventEmitter, Input, Output } from '@angular/core';
import { extend } from 'lodash';
import { merge } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { getDiscountedPrice } from 'src/utils/cart-utils';

export interface ProductCard extends Product{
  quantity:number
}

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})

export class ProductCardComponent{

  @Input()
  product!: ProductCard;

  @Output() addToCartEvent = new EventEmitter<{ productId: string; quantity: number }>();

  addedItem: string[] = [];

  getDiscoutedPrice(product: ProductCard){
    return getDiscountedPrice(product.netPrice, product.discount);
  }

  addItemToCart(id: string, quantity: number) {
    this.addToCartEvent.emit({ productId: id, quantity: quantity });
    this.addedItem.push(id);
  }

}
