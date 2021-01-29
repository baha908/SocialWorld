import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Applicant } from '../models/applicant';

@Injectable({
  providedIn: 'root',
})
export class ApplicantService {
  constructor(private http: HttpClient) {}

  path = 'http://localhost:56183/api/applicant/';
  httpOptions = {};

  applyJob(applicant: Applicant): Observable<Applicant> {
    this.setHttpOptions();
    return this.http.post<Applicant>(
      this.path,
      {
        UserId: applicant.userId,
        JobId: applicant.jobId,
      },
      this.httpOptions
    );
  }

  getJobApplicants(jobId: number): Observable<Applicant[]> {
    this.setHttpOptions();
    return this.http.get<Applicant[]>(
      this.path + 'getallapplicantsbyjobid/' + jobId,
      this.httpOptions
    );
  }

  getUserApplicants(userId: number): Observable<Applicant[]> {
    this.setHttpOptions();
    return this.http.get<Applicant[]>(
      this.path + 'getuserapplicants/' + userId,
      this.httpOptions
    );
  }

  async ifJobApplied(jobId: number): Promise<boolean> {
    const response = await this.getUserApplicants(
      Number(sessionStorage.getItem('userId'))
    ).toPromise();
    return response
      .map((data) => data.jobId.toString())
      .includes(jobId.toString());
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
