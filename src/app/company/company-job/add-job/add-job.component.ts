import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/models/company';
import { JobType } from 'src/app/models/job-type';
import { AlertifyService } from 'src/app/services/alertify.service';
import { CompanyService } from 'src/app/services/company.service';
import { JobService } from 'src/app/services/job.service';
import { Job } from '../../../models/job';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.scss'],
})
export class AddJobComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private jobService: JobService,
    private alertifyService: AlertifyService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  addJobForm!: FormGroup;
  job: Job = new Job();
  jobTypes!: JobType[];
  companies!: Company[];
  companyId!: number;
  createAddJobForm(): void {
    this.addJobForm = this.formBuilder.group({
      name: ['', Validators.required],
      jobTypeId: ['', Validators.required],
      photoString: ['', Validators.required],
      explanation: ['', Validators.required],
    });
  }

  addJob(): void {
    this.companyId = this.route.snapshot.params.companyId;
    if (this.addJobForm.valid) {
      this.job = Object.assign({}, this.addJobForm.value);
      this.job.companyId = this.companyId;
    }
    this.jobService.addJob(this.job).subscribe((data) => {
      this.alertifyService.success(data.name + ' eklendi');
      this.router.navigate(['company/' + this.companyId]);
    });
  }

  ngOnInit(): void {
    this.createAddJobForm();
    this.jobService.getJobTypes().subscribe((data) => {
      this.jobTypes = data;
    });
  }
}
