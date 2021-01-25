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

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };
  jobTypePath = 'http://localhost:56183/api/jobtype/';
  jobPath = 'http://localhost:56183/api/job/';
  addJob(job: Job): Observable<Job> {
    return this.http.post<Job>(
      this.jobPath,
      {
        Name: job.name,
        JobTypeId: job.jobTypeId,
        CompanyId: job.companyId,
      },
      this.httpOptions
    );
  }
  editJob(job: Job): Promise<any> {
    return this.http.put<any>(
      this.jobPath + job.id,
      {
        Name: job.name,
        Id: job.id,
      },
      this.httpOptions
    ).toPromise();
  }
  deleteJob(id: number): Promise<void> {
    return this.http.delete<void>(this.jobPath + id, this.httpOptions).toPromise();
  }
  getJobTypes(): Observable<JobType[]> {
    return this.http.get<JobType[]>(this.jobTypePath, this.httpOptions);
  }
  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.jobPath, this.httpOptions);
  }
  getJob(id: number): Observable<Job> {
    return this.http.get<Job>(this.jobPath + id, this.httpOptions);
  }
}
