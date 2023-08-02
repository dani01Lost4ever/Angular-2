import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, tap } from 'rxjs';
import { JwtService } from './jwt.service';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  picture: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _currentUser$ = new BehaviorSubject<User | null>(null);

  currentUser$ = this._currentUser$.asObservable();

  constructor(
    private jwtSrv: JwtService,
    private http: HttpClient,
    private router: Router
  ) {
    this._currentUser$.subscribe((u) => console.log(u));
    this.fetchUser();
  }

  isLoggedIn() {
    return this.jwtSrv.hasToken();
  }

  login(username: string, password: string) {
    return this.http
      .post<{ user: User; token: string }>('/api/login', { username, password })
      .pipe(
        tap((res) => this.jwtSrv.setToken(res.token)),
        tap((res) => this._currentUser$.next(res.user)),
        map((res) => res.user)
      );
  }

  logout() {
    this.jwtSrv.removeToken();
    this._currentUser$.next(null);
    this.router.navigate(['/']);
  }

  private fetchUser() {
    this.http
      .get<User>('/api/users/me')
      .subscribe((user) => this._currentUser$.next(user));
  }
}
