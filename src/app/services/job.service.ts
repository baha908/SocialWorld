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

  httpOptions = {};
  jobTypePath = 'http://localhost:56183/api/jobtype/';
  jobPath = 'http://localhost:56183/api/job/';
  addJob(job: Job): Observable<Job> {
    this.setHttpOptions();
    return this.http.post<Job>(
      this.jobPath,
      {
        Name: job.name,
        JobTypeId: job.jobTypeId,
        CompanyId: job.companyId,
        Explanation: job.explanation,
        PhotoString: job.photoString,
      },
      this.httpOptions
    );
  }
  editJob(job: Job): Promise<any> {
    this.setHttpOptions();
    return this.http
      .put<any>(
        this.jobPath + job.id,
        {
          Name: job.name,
          Id: job.id,
          Explanation: job.explanation,
          PhotoString: job.photoString,
        },
        this.httpOptions
      )
      .toPromise();
  }
  deleteJob(id: number): Promise<void> {
    this.setHttpOptions();
    return this.http
      .delete<void>(this.jobPath + id, this.httpOptions)
      .toPromise();
  }
  getJobTypes(): Observable<JobType[]> {
    this.setHttpOptions();
    return this.http.get<JobType[]>(this.jobTypePath, this.httpOptions);
  }
  getAllJobs(): Observable<Job[]> {
    this.setHttpOptions();
    return this.http.get<Job[]>(this.jobPath, this.httpOptions);
  }
  getJobs(companyId: number): Observable<Job[]> {
    this.setHttpOptions();
    return this.http.get<Job[]>(
      this.jobPath + 'getjobsbycompanyid/' + companyId,
      this.httpOptions
    );
  }
  getJob(jobId: number): Observable<Job> {
    this.setHttpOptions();
    return this.http.get<Job>(this.jobPath + jobId, this.httpOptions);
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
