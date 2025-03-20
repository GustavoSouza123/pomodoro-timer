import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: User = {
    email: 'gustavo',
    password: '1234',
  };

  loggedIn: boolean = true;

  isUserLoggedIn() {
    const promise = new Promise<boolean>((resolve, reject) => {
      resolve(this.loggedIn);
    });
    return promise;
  }

  login(email: string, password: string) {
    let isValid = this.user.email === email && this.user.password === password;
    this.loggedIn = isValid;
    return isValid;
  }

  logout() {
    this.loggedIn = false;
  }
}
