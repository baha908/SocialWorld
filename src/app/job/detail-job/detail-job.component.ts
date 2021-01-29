import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Applicant } from 'src/app/models/applicant';
import { Company } from 'src/app/models/company';
import { Job } from 'src/app/models/job';
import { User } from 'src/app/models/user';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ApplicantService } from 'src/app/services/applicant.service';
import { CompanyService } from 'src/app/services/company.service';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-detail-job',
  templateUrl: './detail-job.component.html',
  styleUrls: ['./detail-job.component.scss'],
})
export class DetailJobComponent implements OnInit {
  constructor(
    private jobService: JobService,
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private router: Router,
    private applicantService: ApplicantService,
    private alertifyService: AlertifyService
  ) {}
  job = new Job();
  applicant = new Applicant();
  company = new Company();
  ifJobApplied!: boolean;
  ifUserIsEmployer!: boolean;

  applyJob(): void {
    this.applicantService.applyJob(this.applicant).subscribe(
      (data) => {
        this.alertifyService.success(this.job.name + '\'e başvurdunuz.');
        this.ifJobApplied = true;
      },
      () => {
        this.alertifyService.error('Hata');
      }
    );
  }


  async ngOnInit(): Promise<void> {
    this.applicant.jobId = this.route.snapshot.params.id;
    this.applicant.userId = Number(sessionStorage.getItem('userId'));
    this.ifJobApplied = await this.applicantService.ifJobApplied(
      this.applicant.jobId
    );
    this.job = await this.jobService.getJob(this.applicant.jobId).toPromise();
    this.company = await this.companyService.getCompanyById(this.job.companyId).toPromise();
  }
}
