import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { SummaryComponent } from './components/summary/summary.component';
import { HttpClientModule } from '@angular/common/http';
import { DiscountAmountPipe } from './pipes/discount-amount.pipe';
import { CurrencyPipe, registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import { DEFAULT_VAT, VatService } from './services/vat.service';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductsComponent } from './pages/products/products.component';
import { ProductFiltersComponent } from './components/product-filters/product-filters.component';
import { SideCartComponent } from './components/side-cart/side-cart.component';
registerLocaleData(localeIt);

@NgModule({
  declarations: [
    AppComponent,
    CartItemComponent,
    SummaryComponent,
    DiscountAmountPipe,
    CheckoutComponent,
    ProductsComponent,
    ProductFiltersComponent,
    SideCartComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
   { provide: LOCALE_ID, useValue: 'it-IT' },
   { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR'},
   { provide: DEFAULT_VAT, useValue: 0.10},
   CurrencyPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
