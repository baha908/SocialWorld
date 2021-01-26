import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { AlertifyService } from '../services/alertify.service';
import { UserLoginModel } from '../models/user-login-model';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private accountService: AccountService,
    private router: Router,
    private formBuilder: FormBuilder,
    private alertifyService: AlertifyService,
    private companyService: CompanyService
  ) {}
  loginForm!: FormGroup;
  model: UserLoginModel = new UserLoginModel();

  createLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  async login(): Promise<void> {
    if (this.loginForm.valid) {
      this.model = Object.assign({}, this.loginForm.value);
    }
    await this.accountService.login(this.model).then(() => {
      this.alertifyService.success(this.model.email + ' giriş yaptı');
      this.router.navigate(['']);
    }).catch(() => {
      this.alertifyService.error('giriş başarısız');
    });
  }
  ngOnInit(): void {
    this.createLoginForm();
  }
}
