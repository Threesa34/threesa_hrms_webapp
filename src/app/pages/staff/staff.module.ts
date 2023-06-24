import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { FileUploadModule } from 'ng2-file-upload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModules } from '../../shared/material-modules';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import {NgxPrintModule} from 'ngx-print';

import { StaffRoutingModule } from './staff-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyAttendanceComponent } from './my-attendance/my-attendance.component';
import { MyLeavesComponent } from './my-leaves/my-leaves.component';
import { LoanRequestComponent } from './loan-request/loan-request.component';
import { LoanReceiptsComponent } from './loan-receipts/loan-receipts.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    DashboardComponent,
    MyAttendanceComponent,
    MyLeavesComponent,
    LoanRequestComponent,
    LoanReceiptsComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    StaffRoutingModule,
    FileUploadModule,
    NgxPrintModule,
    AgGridModule.withComponents([]),
    MaterialModules,
    FormsModule,
    ReactiveFormsModule,
    PdfViewerModule
  ]
})
export class StaffModule { }
