import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private accountService: AccountService, private router: Router) {}

  isLoggedIn(): boolean {
    return this.accountService.isLoggedIn();
  }
  logout(): void {
    this.accountService.logout();
    this.router.navigate(['home']);
  }
  ngOnInit(): void{}
}
