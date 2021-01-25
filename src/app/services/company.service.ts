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

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };
  addCompany(company: Company): Observable<Company> {
    return this.http.post<Company>(
      this.path,
      {
        Name: company.name,
        Address: company.address,
        AppUserId: company.userId,
      },
      this.httpOptions
    );
  }
  editCompany(company: Company): Promise<Company> {
    return this.http.put<Company>(
      this.path,
      {
        Id: company.id,
        Address: company.address,
        Name: company.name,
      },
      this.httpOptions
    ).toPromise();
  }
  deleteCompany(id: number): Promise<void> {
    return this.http.delete<void>(this.path + id, this.httpOptions).toPromise();
  }
  getUserCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(
      this.path + 'getcompanies/' + localStorage.getItem('userId'),
      this.httpOptions
    );
  }
  async ifUserHaveCompany(): Promise<boolean> {
    const response = await this.getUserCompanies().toPromise();
    if (response.length === 0) {
      return false;
    }
    return true;
  }
}
