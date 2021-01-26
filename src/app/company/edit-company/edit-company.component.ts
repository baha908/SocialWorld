import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { EditCompanyModel } from 'src/app/models/edit-company-model';
import { AlertifyService } from 'src/app/services/alertify.service';
import { CompanyService } from "../../services/company.service";
@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.scss']
})
export class EditCompanyComponent implements OnInit {

  constructor(private service: CompanyService,private route: ActivatedRoute,private alertifyService:AlertifyService) { }

  ngOnInit(): void {
    this.getCompany();
  }
  model!: EditCompanyModel
  async getCompany(): Promise<void>{
    this.model.id = this.route.snapshot.params.id;
    this.service.getCompanyById(this.model.id).subscribe((data) => {
      data.id = this.model.id;
      data.name = this.model.name;
      data.address = this.model.address;
    });

  }

  async editCompany(): Promise<void> {
    await this.service.editCompany(this.model).then(() => {
      this.alertifyService.success('Güncelleme Başarılı');
      
    });
  }

}
