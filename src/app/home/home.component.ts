import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { ApplicantService } from '../services/applicant.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private applicantService: ApplicantService) {}

  ngOnInit(): void {
    this.applicantService.applyJob({
      userId: 3,
      jobId: 28,
      id: 0,
      applicationDate: new Date()
    }).subscribe(data => {
      console.log(data);
    })
  }
}
