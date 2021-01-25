import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { User } from '../models/user';
import { UserLoginModel } from '../models/user-login-model';
import { UserRegisterModel } from '../models/user-register-model';

@Injectable()
export class AccountService {
  constructor(private http: HttpClient) {}
  path = 'http://localhost:56183/api/auth/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };
  async login(user: UserLoginModel): Promise<any> {
    const response = await this.http
      .post<any>(this.path + 'signin', user, this.httpOptions)
      .pipe(
        tap((data) => {
          localStorage.setItem('loggedUser', user.email);
          localStorage.setItem('token', data.token);
          return true;
        })
      )
      .toPromise();
    localStorage.setItem('userId', (await this.getActiveUser()).id.toString());
    return response;
  }

  register(user: UserRegisterModel): Promise<any> {
    return this.http
      .post<any>(this.path + 'signup', user, this.httpOptions)
      .toPromise();
  }

  async getActiveUser(): Promise<User> {
    return await this.http
      .get<User>(this.path + 'getactiveuser', this.httpOptions).toPromise();
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') != null;
  }

  logout(): void {
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('token');
  }
}
