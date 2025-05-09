import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // private user!: User;
  private user: User = {
    id: 1,
    name: 'Gustavo',
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
    return this.http.get<any>(`${environment.apiUrl}/api/users`, {
      observe: 'response',
    });
  }

  createUser(name: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/users`, {
      name,
      email,
      password,
    });
  }

  updateUser(id: number, name: string, email: string, password: string): Observable<any> {
    this.user = {
      ...this.user,
      name,
      email,
      password,
    };
    return this.http.put<any>(`${environment.apiUrl}/api/users/${id}`, {
      name,
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
        let user = res.body.find((user: any) => user.email === email && user.password === password);
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
