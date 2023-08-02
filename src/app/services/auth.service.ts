import { Injectable } from '@angular/core';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  picture: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
}
