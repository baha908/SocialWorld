import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Company } from 'src/app/models/company';
import { JobType } from 'src/app/models/job-type';
import { AlertifyService } from 'src/app/services/alertify.service';
import { CompanyService } from 'src/app/services/company.service';
import { JobService } from 'src/app/services/job.service';
import { Job } from '../../models/job';

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.scss'],
})
export class EditJobComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
    private jobService: JobService,
    private route: ActivatedRoute,
    private alertifyService: AlertifyService,
    private router: Router
  ) {}
  id!: number;
  editJobForm!: FormGroup;
  job: Job = new Job();
  jobTypes!: JobType[];
  companies!: Company[];
  createEditJobForm(): void {
    this.editJobForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  async editJob(): Promise<void> {
    if (this.editJobForm.valid) {
      this.job = Object.assign({}, this.editJobForm.value);
    }
    this.job.id = this.id;
    await this.jobService
      .editJob(this.job)
      .then(() => {
        this.alertifyService.success('Güncelleme başarılı');
        this.router.navigate(['job']);
      })
      .catch(() => {
        this.alertifyService.error('Hata');
      });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.createEditJobForm();
    this.jobService
      .getJob(this.id)
      .subscribe((data) => this.editJobForm.patchValue(data));
    this.jobService.getJobTypes().subscribe((data) => {
      this.jobTypes = data;
    });
    this.companyService.getUserCompanies().subscribe((data) => {
      this.companies = data;
    });
  }
}
