import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { CompanyService } from '../services/company.service';

@Injectable()
export class VolunteerGuard implements CanActivate {
  constructor(private router: Router, private companyService: CompanyService) {}
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    if (!await this.companyService.ifUserHaveCompany()) {
      return true;
    }
    this.router.navigate(['home']);
    return false;
  }
}
