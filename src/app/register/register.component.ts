import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { UserRegisterModel } from './user_register_model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private accountService: AccountService, private router: Router) { }
  model: UserRegisterModel = new UserRegisterModel();

  ngOnInit(): void {}
  async register(form: NgForm): Promise<void> {
    await this.accountService.register(this.model);
    await this.accountService.login({ email: this.model.email, password: this.model.password});
    this.router.navigate(['']);
  }
}
