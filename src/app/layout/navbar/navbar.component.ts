import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private accountService: AccountService, private router: Router, private alertifyService: AlertifyService) {}

  isLoggedIn(): boolean {
    return this.accountService.isLoggedIn();
  }
  loogedUser(): string {
    return '' + sessionStorage.getItem('loggedUser');
  }
  logout(): void {
    this.accountService.logout();
    this.alertifyService.warning('Çıkış yapıldı');
    this.router.navigate(['login']);
  }
  ngOnInit(): void{}
}
