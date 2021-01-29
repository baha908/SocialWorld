import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../models/company';

@Injectable()
export class CompanyService {
  constructor(private http: HttpClient) {}
  path = 'http://localhost:56183/api/company/';

  httpOptions = {};
  addCompany(company: Company): Observable<Company> {
    this.setHttpOptions();
    return this.http.post<Company>(
      this.path,
      {
        Name: company.name,
        Address: company.address,
        AppUserId: company.userId,
        Email: company.email,
        Explanation: company.explanation,
        PhoneNumber: company.phoneNumber,
        PhotoString: company.photoString
      },
      this.httpOptions
    );
  }
  editCompany(company: Company): Promise<Company> {
    this.setHttpOptions();
    return this.http
      .put<Company>(
        this.path + company.id,
        {
          Id: company.id,
          Address: company.address,
          Name: company.name,
          Email: company.email,
          Explanation: company.explanation,
          PhoneNumber: company.phoneNumber,
          PhotoString: company.photoString
        },
        this.httpOptions
      )
      .toPromise();
  }
  async deleteCompany(id: number): Promise<void> {
    this.setHttpOptions();
    const response = await this.http
      .delete<void>(this.path + id, this.httpOptions)
      .toPromise();
    return response;
  }
  getUserCompanies(): Observable<Company[]> {
    this.setHttpOptions();
    return this.http.get<Company[]>(
      this.path + 'getcompanies/' + sessionStorage.getItem('userId'),
      this.httpOptions
    );
  }

  getCompanyById(id: number): Observable<Company> {
    this.setHttpOptions();
    return this.http.get<Company>(this.path + `${id}`, this.httpOptions);
  }
  async ifUserHaveCompany(): Promise<boolean> {
    this.setHttpOptions();
    const response = await this.getUserCompanies().toPromise();
    if (response.length === 0) {
      return false;
    }
    return true;
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
