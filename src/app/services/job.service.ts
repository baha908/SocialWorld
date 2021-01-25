import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from '../models/job';
import { JobType } from '../models/job-type';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  constructor(private http: HttpClient) {}

  jobTypePath = 'http://localhost:56183/api/jobtype/';
  jobPath = 'http://localhost:56183/api/job/';
  addJob(job: Job): Observable<Job> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http.post<Job>(
      this.jobPath,
      {
        Name: job.name,
        JobTypeId: job.jobTypeId,
        CompanyId: job.companyId,
      },
      httpOptions
    );
  }
  getJobTypes(): Observable<JobType[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http.get<JobType[]>(
      this.jobTypePath,
      httpOptions
    );
  }
  getJobs(): Observable<JobType[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http.get<JobType[]>(
      this.jobPath,
      httpOptions
    );
  }
}
