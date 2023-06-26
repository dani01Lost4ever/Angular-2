import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { SummaryComponent } from './components/summary/summary.component';
import { DiscountAmountPipe } from './pipes/discount-amount.pipe';
import { CurrencyPipe, registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it'

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
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'it-IT' },
    {provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' },
    CurrencyPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
