import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCompanyComponent } from './company/add-company/add-company.component';
import { CompanyComponent } from './company/company.component';
import { HomeComponent } from './home/home.component';
import { JobComponent } from './job/job.component';
import { EmployerGuard } from './guards/employer.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddJobComponent } from './job/add-job/add-job.component';
import { EditJobComponent } from './job/edit-job/edit-job.component';
import { EditCompanyComponent } from './company/edit-company/edit-company.component';
import { UserGuard } from './guards/user.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [UserGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'company/add_company',
    component: AddCompanyComponent,
    canActivate: [UserGuard],
  },
  {
    path: 'company',
    component: CompanyComponent,
    canActivate: [UserGuard, EmployerGuard],
  },
  {
    path: 'company/edit_company/:id',
    component: EditCompanyComponent,
    canActivate: [UserGuard, EmployerGuard],
  },
  {
    path: 'job/add_job',
    component: AddJobComponent,
    canActivate: [UserGuard, EmployerGuard],
  },
  {
    path: 'job/edit_job/:id',
    component: EditJobComponent,
    canActivate: [UserGuard, EmployerGuard],
  },
  { path: 'job', component: JobComponent, canActivate: [UserGuard] },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
