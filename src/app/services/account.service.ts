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

  httpOptions = {};
  async login(user: UserLoginModel): Promise<any> {
    return this.http
      .post<any>(this.path + 'signin', user, this.httpOptions)
      .toPromise()
      .then(async (data) => {
        sessionStorage.setItem('loggedUser', user.email);
        sessionStorage.setItem('token', data.token);
        this.setHttpOptions();
        const userId = (await this.getActiveUser()).id.toString();
        sessionStorage.setItem('userId', userId);
      })
      .then(async () => {
        const ifUserHaveCompany = await this.companyService.ifUserHaveCompany();
        if (ifUserHaveCompany) {
          sessionStorage.setItem('hasCompany', 'true');
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
      .get<User>(this.path + 'getactiveuser', this.httpOptions)
      .toPromise();
  }
  isLoggedIn(): boolean {
    return sessionStorage.getItem('token') != null;
  }

  logout(): void {
    sessionStorage.removeItem('loggedUser');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('hasCompany');
  }
  private setHttpOptions(): void {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      }),
    };
  }
}
