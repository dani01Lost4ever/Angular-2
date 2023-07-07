import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { SummaryComponent } from './components/summary/summary.component';
import { HttpClientModule } from '@angular/common/http';
import { DiscountAmountPipe } from './pipes/discount-amount.pipe';
import { CurrencyPipe, registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import { DEFAULT_VAT, VatService } from './services/vat.service';
registerLocaleData(localeIt);

@NgModule({
  declarations: [
    AppComponent,
    CartItemComponent,
    SummaryComponent,
    DiscountAmountPipe
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
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
