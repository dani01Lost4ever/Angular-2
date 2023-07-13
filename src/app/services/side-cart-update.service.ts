import { Injectable } from '@angular/core';
import { Subject, delay, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SideCartUpdateService {

  constructor() { }

  private cartUpdatedSource = new Subject<void>();
  cartUpdated$ = this.cartUpdatedSource.asObservable();

  notifyCartUpdated() {
    timer(100)
      .pipe(delay(100))
      .subscribe(() => {
        this.cartUpdatedSource.next();
    });
  }
}
