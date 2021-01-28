import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Job } from '../models/job';
import { AlertifyService } from '../services/alertify.service';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
})
export class JobComponent implements OnInit {
  constructor(
    private jobService: JobService,
    private router: Router,
  ) {}
  jobs!: Job[];
  getJobs(): void{
    this.jobService.getAllJobs().subscribe((data) => {
      this.jobs = data;
    });
  }
  ngOnInit(): void {
    this.getJobs();
  }
}
