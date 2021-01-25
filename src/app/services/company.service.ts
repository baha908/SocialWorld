import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Company } from '../models/company';
import { AccountService } from './account.service';

@Injectable()
export class CompanyService {
  constructor(private http: HttpClient) {}
  path = 'http://localhost:56183/api/company/';

  addCompany(company: Company): Observable<Company> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http.post<Company>(
      this.path,
      {
        Name: company.name,
        Address: company.address,
        AppUserId: company.userId,
      },
      httpOptions
    );
  }

  getUserCompanies(): Observable<Company[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http.get<Company[]>(
      this.path + 'getcompanies/' + localStorage.getItem('userId'),
      httpOptions
    );
  }
  async ifUserHaveCompany(): Promise<boolean> {
    const response = await this.getUserCompanies().toPromise();
    if (response.length === 0){
      return false;
    }
    return true;
  }
}

