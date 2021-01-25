import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { AccountService } from './services/account.service';
import { AlertifyService } from './services/alertify.service';
import { CompanyComponent } from './company/company.component';
import { AddCompanyComponent } from './company/add-company/add-company.component';
import { UserGuard } from './guards/user.guard';
import { VolunteerGuard } from './guards/volunteer.guard';
import { EmployerGuard } from './guards/employer.guard';
import { JobComponent } from './job/job.component';
import { CompanyService } from './services/company.service';
import { AddJobComponent } from './job/add-job/add-job.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavBarComponent,
    FooterComponent,
    SidebarComponent,
    CompanyComponent,
    AddCompanyComponent,
    JobComponent,
    AddJobComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    AccountService,
    AlertifyService,
    UserGuard,
    VolunteerGuard,
    EmployerGuard,
    CompanyService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
