import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Company } from 'src/app/models/company';
import { AlertifyService } from 'src/app/services/alertify.service';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.scss'],
})
export class EditCompanyComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private alertifyService: AlertifyService,
    private router: Router
  ) {}
  id!: number;
  editCompanyForm!: FormGroup;
  company: Company = new Company();
  createEditCompanyForm(): void {
    this.editCompanyForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      explanation: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      photoString: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  async editCompany(): Promise<void> {
    if (this.editCompanyForm.valid) {
      this.company = Object.assign({}, this.editCompanyForm.value);
    }
    this.company.id = this.id;
    await this.companyService
      .editCompany(this.company)
      .then(() => {
        this.alertifyService.success('Güncelleme başarılı');
        this.router.navigate(['company']);
      })
      .catch(() => {
        this.alertifyService.error('Hata');
      });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.createEditCompanyForm();
    this.companyService
      .getCompanyById(this.id)
      .subscribe((data) => this.editCompanyForm.patchValue(data));
  }
}
