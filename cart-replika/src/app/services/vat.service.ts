import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VatService {
  vat$ = new ReplaySubject<number>();

  constructor() {
    this.vat$.next(0);
  }

  setCountry(countryCode: string) {
    const value = countryCode === 'IT' ? 0.22 : 0;
    this.vat$.next(value);
  }
}
