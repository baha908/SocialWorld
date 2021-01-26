import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry, tap } from 'rxjs/operators';
import { User } from '../models/user';
import { UserLoginModel } from '../models/user-login-model';
import { UserRegisterModel } from '../models/user-register-model';
import { CompanyService } from './company.service';

@Injectable()
export class AccountService {
  constructor(
    private http: HttpClient,
    private companyService: CompanyService
  ) {}
  path = 'http://localhost:56183/api/auth/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };
  async login(user: UserLoginModel): Promise<any> {
    let userId!: string;
    let ifUserHaveCompany: boolean;
    return await this.http
      .post<any>(this.path + 'signin', user, this.httpOptions).pipe(retry(3))
      .toPromise()
      .then(async (data) => {
        localStorage.setItem('loggedUser', user.email);
        localStorage.setItem('token', data.token);
      })
      .then(async () => {
        userId = (await this.getActiveUser()).id.toString();
      })
      .then(async () => {
        localStorage.setItem('userId', userId);
        ifUserHaveCompany = await this.companyService.ifUserHaveCompany();
      })
      .then(async () => {
        if (ifUserHaveCompany) {
          localStorage.setItem('hasCompany', 'true');
        }
      });
  }

  async register(user: UserRegisterModel): Promise<any> {
    return this.http
      .post<any>(this.path + 'signup', user, this.httpOptions)
      .toPromise();
  }

  async getActiveUser(): Promise<User> {
    return await this.http
      .get<User>(this.path + 'getactiveuser', this.httpOptions).pipe(retry(3))
      .toPromise();
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') != null;
  }

  logout(): void {
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('hasCompany');
  }
}
