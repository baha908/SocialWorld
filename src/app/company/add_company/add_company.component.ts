import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AccountService } from 'src/app/services/account.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from '../company';

@Component({
  selector: 'app-add-company',
  templateUrl: './add_company.component.html',
  styleUrls: ['./add_company.component.scss'],
})
export class AddCompanyComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
    private accountService: AccountService,
    private alertifyService: AlertifyService
  ) {}
  addCompanyForm!: FormGroup;
  company: Company = new Company();

  createAddCompanyForm(): void {
    this.addCompanyForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  async addCompany(): Promise<void> {
    if (this.addCompanyForm.valid) {
      this.company = Object.assign({}, this.addCompanyForm.value);
      this.company.userId = Number((await this.accountService.getActiveUser()).id);
    }
    this.companyService.addProduct(this.company).subscribe((data) => {
      console.log(JSON.stringify(data));
    });
  }

  ngOnInit(): void {
    this.createAddCompanyForm();
  }
}
