import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // private user!: User;
  private user: User = {
    id: 1,
    email: 'gustavo@gmail.com',
    password: '1234',
    created: '2025-03-18T23:29:07.000Z',
  };

  private loggedIn: boolean = true;

  constructor(private http: HttpClient) {}

  getUserData(): User {
    return this.user;
  }

  getUsers(): Observable<any> {
    return this.http.get<any>('http://localhost:8000/api/users', {
      observe: 'response',
    });
  }

  createUser(email: string, password: string): Observable<any> {
    return this.http.post<any>('http://localhost:8000/api/users', {
      email,
      password,
    });
  }

  updateUser(id: number, email: string, password: string): Observable<any> {
    return this.http.put<any>(`http://localhost:8000/api/users/${id}`, {
      email,
      password,
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
          this.user = user;
          this.loggedIn = true;
        }
        resolve(this.loggedIn); // resolving the boolean after login check
      });
    });
  }

  logout() {
    this.loggedIn = false;
  }

  checkUniqueUser(email: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.getUsers().subscribe((res) => {
        let user = res.body.find((user: any) => user.email === email);
        if (user) {
          resolve(false);
        }
        resolve(true);
      });
    });
  }
}
