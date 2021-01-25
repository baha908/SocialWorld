import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  private readonly onDestroy = new Subject<void>();
  constructor(private companyService: CompanyService) {}

  isUserHaveCompany = false;
  isLoggedIn(): boolean {
    return localStorage.getItem('token') != null;
  }
  ngOnInit(): void {
    this.companyService.getUserCompanies().subscribe((data) => {
      this.isUserHaveCompany = data.length !== 0;
    });
  }
}
