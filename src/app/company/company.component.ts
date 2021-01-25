import { Component, OnInit } from '@angular/core';
import { Company } from '../models/company';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent implements OnInit {
  constructor(private companyService: CompanyService) {}

  companies!: Company[];
  async ngOnInit(): Promise<void> {
    this.companies = await this.companyService.getUserCompanies().toPromise();
  }
}
