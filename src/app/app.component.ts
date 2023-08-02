import { Component } from '@angular/core';
import { VatService } from './services/vat.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  currentUser$ = this.authSrv.currentUser$;

  constructor(protected varSrv: VatService, protected authSrv: AuthService) {
    let country = 'IT';
    this.varSrv.setCountry(country);
  }

  logout() {
    this.authSrv.logout();
  }
}
