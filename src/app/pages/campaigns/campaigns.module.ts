import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgGridModule } from 'ag-grid-angular';
import { FileUploadModule } from 'ng2-file-upload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModules } from '../../shared/material-modules';
import { EmailEditorModule } from 'angular-email-editor';

import { CampaignsRoutingModule } from './campaigns-routing.module';
import { NewsLettersComponent } from './news-letters/news-letters.component';
import { NewsLettersDetailsComponent } from './news-letters-details/news-letters-details.component';
import { NewsLettersResponseComponent, customerFeedback } from './news-letters-response/news-letters-response.component';
import { NewsLettersCampaignComponent, shareOnEmail, shareOnmessage } from './news-letters-campaign/news-letters-campaign.component';
import { EnquiriesComponent } from './enquiries/enquiries.component';
import { DetailsComponent } from './enquiries/sub_modules/details/details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QrCodesComponent } from './qr-codes/qr-codes.component';


@NgModule({
  declarations: [NewsLettersComponent, NewsLettersDetailsComponent, NewsLettersResponseComponent,customerFeedback,  NewsLettersCampaignComponent, shareOnEmail, shareOnmessage, EnquiriesComponent, DetailsComponent, DashboardComponent, QrCodesComponent],
  imports: [
    CommonModule,
    CampaignsRoutingModule,
    FileUploadModule,
    EmailEditorModule,
    AgGridModule.withComponents([]),
    MaterialModules,
    FormsModule,
    ReactiveFormsModule,
  ],
  
})
export class CampaignsModule { }
