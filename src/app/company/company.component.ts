import { Component, OnInit } from '@angular/core';
import { Company } from '../models/company';
import { AlertifyService } from '../services/alertify.service';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent implements OnInit {
  constructor(
    private companyService: CompanyService,
    private alertifyService: AlertifyService
  ) {}

  companies!: Company[];
  deleteCompany(id: number): void {
    this.companyService
      .deleteCompany(id)
      .then(() => {
        this.getCompanies();
      })
      .then(async () => {
        if (!(await this.companyService.ifUserHaveCompany())) {
          sessionStorage.removeItem('hasCompany');
        }
        this.alertifyService.success('Silme başarılı');
      })
      .catch(() => {
        this.alertifyService.error('Hata');
      });
  }
  getCompanies(): void {
    this.companyService.getUserCompanies().subscribe((data) => {
      this.companies = data;
    });
  }
  ngOnInit(): void {
    this.getCompanies();
  }
}
