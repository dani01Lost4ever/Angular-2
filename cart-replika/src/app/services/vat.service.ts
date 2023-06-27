import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { getVat } from 'src/utils/cart-utils';

@Injectable({
  providedIn: 'root'
})

export class VatService {
  private vat = new ReplaySubject<number>();
  vat$ = this.vat.asObservable();
  

  constructor() {
    this.vat.next(0);
  }

  setCountry(countryCode: string) {
    const value = getVat(countryCode);
    //return value;
    this.vat.next(value);
  }

}
