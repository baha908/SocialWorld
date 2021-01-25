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
    private alertifyService: AlertifyService,
    private router: Router,
  ) {}
  jobs!: Job[];
  deleteJob(id: number): void {
    this.jobService
      .deleteJob(id)
      .then(() => {
        this.alertifyService.success('Silme başarılı');
        window.location.reload();
      })
      .catch(() => {
        this.alertifyService.error('Hata');
      });
  }
  ngOnInit(): void {
    this.jobService.getJobs().subscribe((data) => {
      this.jobs = data;
    });
  }
}
