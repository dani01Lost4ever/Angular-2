import { Component, OnInit } from '@angular/core';
import { getDiscountAmount, getDiscountedPrice, getFinalPrice } from 'src/utils/cart-utils';
import { CartSourceService } from './services/cart-source.service';
import { VatService } from './services/vat.service';
import { CartArticle } from './interfaces/cart-article';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  items$ = this.cartService.items$;
  vat$ = this.vatService.vat$;

  constructor(private cartService: CartSourceService,
              private vatService: VatService) {
  }

  ngOnInit(): void {
    let country = 'IT';
    setInterval(() => {
      country = country === 'IT' ? 'EN' : 'IT';
      this.vatService.setCountry(country);
    }, 2000);
  }

  updateQuantity(item: CartArticle, quantity: number) {
    this.cartService.setQuantity(item.id, quantity);
  }

  trackById(_: number, item: CartArticle) {
    return item.id;
  }
}

