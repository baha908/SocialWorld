import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Company } from 'src/app/models/company';
import { JobType } from 'src/app/models/job-type';
import { AlertifyService } from 'src/app/services/alertify.service';
import { CompanyService } from 'src/app/services/company.service';
import { JobService } from 'src/app/services/job.service';
import { Job } from '../../models/job';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.scss'],
})
export class AddJobComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
    private jobService: JobService,
    private alertifyService: AlertifyService,
    private router: Router
  ) {}
  addJobForm!: FormGroup;
  job: Job = new Job();
  jobTypes!: JobType[];
  companies!: Company[];
  createAddJobForm(): void {
    this.addJobForm = this.formBuilder.group({
      name: ['', Validators.required],
      jobTypeId: ['', Validators.required],
      companyId: ['', Validators.required],
    });
  }

  addJob(): void {
    if (this.addJobForm.valid) {
      this.job = Object.assign({}, this.addJobForm.value);
    }
    this.jobService.addJob(this.job).subscribe((data) => {
      this.alertifyService.success(data.name + ' eklendi');
      this.router.navigate(['job']);
    });
  }

  ngOnInit(): void {
    this.createAddJobForm();
    this.jobService.getJobTypes().subscribe((data) => {
      this.jobTypes = data;
    });
    this.companyService.getUserCompanies().subscribe((data) => {
      this.companies = data;
    });
  }
}
