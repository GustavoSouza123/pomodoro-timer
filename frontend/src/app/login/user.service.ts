import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: User = {
    email: '',
    password: '',
  };

  loggedIn: boolean = false;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get<any>('http://localhost:8000/api/users', {
      observe: 'response',
    });
  }

  isUserLoggedIn(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      resolve(this.loggedIn);
    });
  }

  login(email: string, password: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.getUsers().subscribe((res) => {
        let user = res.body.find(
          (user: any) => user.email === email && user.password === password
        );
        if (user) {
          this.user.email = email;
          this.user.password = password;
          this.loggedIn = true;
        }
        resolve(this.loggedIn); // resolving the boolean after login check
      });
    });
  }

  logout() {
    this.loggedIn = false;
  }
}
