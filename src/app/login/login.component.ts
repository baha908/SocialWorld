import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { UserLoginModel } from './user_login_model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private accountService: AccountService, private router: Router) { }
  model: UserLoginModel = new UserLoginModel();

  ngOnInit(): void {}
  async login(form: NgForm): Promise<void> {
    await this.accountService.login(this.model);
    this.router.navigate(['']);
  }
}
