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
    this.applicantService.getUserApplicants(3).subscribe(data => {
      console.log(JSON.stringify(data) + '\n');
    });
    this.applicantService.getJobApplicants(27).subscribe(data => {
      console.log(JSON.stringify(data));
    });
  }
}
