import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { FileUploadModule } from 'ng2-file-upload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModules } from '../../shared/material-modules';
import { SuperadminRoutingModule } from './superadmin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersDetailsComponent } from './users-details/users-details.component';



@NgModule({
  declarations: [DashboardComponent, CompanyListComponent, CompanyDetailsComponent, UsersListComponent, UsersDetailsComponent],
  imports: [
    CommonModule,
    SuperadminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    AgGridModule.withComponents([]),
    MaterialModules
  ]
})
export class SuperadminModule { }
