import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCompanyComponent } from './company/add-company/add-company.component';
import { CompanyComponent } from './company/company.component';
import { HomeComponent } from './home/home.component';
import { AddJobComponent } from './job/add-job/add-job.component';
import { JobComponent } from './job/job.component';
import { EmployerGuard } from './login/employer.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'company/add_company', component: AddCompanyComponent},
  {path: 'company', component: CompanyComponent},
  {path: 'job/add_job', component: AddJobComponent, canActivate: [EmployerGuard]},
  {path: 'job', component: JobComponent},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
