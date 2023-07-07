import { Inject, Injectable, InjectionToken } from '@angular/core';
import { ReplaySubject } from 'rxjs';

export const DEFAULT_VAT = new InjectionToken<number>('DEFAULT_VAT');

@Injectable({
  providedIn: 'root'
})
export class VatService {
  private _vat$ = new ReplaySubject<number>();
  vat$ = this._vat$.asObservable();

  constructor(@Inject(DEFAULT_VAT) private defaultVat: number) {
    this._vat$.next(this.defaultVat);
  }

  setCountry(countryCode: string) {
    const value = countryCode === 'IT' ? 0.22 : this.defaultVat;
    this._vat$.next(value);
  }
}
