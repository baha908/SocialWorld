import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() { }
  isLoggedIn(): boolean{
    return localStorage.getItem('token') != null;
  }
  ngOnInit(): void {
  }

}
