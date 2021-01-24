import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { UserLoginModel } from '../login/user_login_model';
import { UserRegisterModel } from '../register/user_register_model';

@Injectable()
export class AccountService {
  constructor(private http: HttpClient) {}
  path = 'http://localhost:56183/api/auth/';

  login(user: UserLoginModel): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .post<any>(this.path + 'signin', user, httpOptions)
      .pipe(
        tap((data) => {
          localStorage.setItem('loggedUser', user.email);
          localStorage.setItem('token', data.token);
          console.log(localStorage.getItem('token'));
          return true;
        })
      )
      .toPromise();
  }

  register(user: UserRegisterModel): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .post<any>(this.path + 'signup', user, httpOptions)
      .toPromise();
  }
  isLoggedIn(): boolean {
    return localStorage.getItem('token') != null;
  }
  logout(): void {
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('token');
  }
}
