import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { FileUploadModule } from 'ng2-file-upload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModules } from '../../shared/material-modules';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import {NgxPrintModule} from 'ngx-print';

import { ManagerRoutingModule } from './manager-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    DashboardComponent,
   
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    FileUploadModule,
    NgxPrintModule,
    AgGridModule.withComponents([]),
    MaterialModules,
    FormsModule,
    ReactiveFormsModule,
    PdfViewerModule
  ]
})
export class ManagerModule { }
