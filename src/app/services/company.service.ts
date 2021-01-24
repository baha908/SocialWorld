import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Company } from '../company/company';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private http: HttpClient) {}
  path = 'http://localhost:56183/api/company/';

  addProduct(company: Company): Observable<Company> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http
      .post<Company>(this.path + 'company_add', {
        Name: company.name,
        Address: company.address,
        AppUserId: company.userId
      }, httpOptions);
  }
}
