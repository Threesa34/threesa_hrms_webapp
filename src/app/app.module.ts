import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientJsonpModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { HttpInterpritorService } from './helper/http-interpritor.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './layout/auth/auth.component';
import { AdminComponent } from './layout/admin/admin.component';
import { TitleComponent } from './layout/admin/title/title.component';
import { BreadcrumbsComponent } from './layout/admin/breadcrumbs/breadcrumbs.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { AccordionLinkDirective } from './shared/accordion/accordionlink.directive';
import { AccordionDirective } from './shared/accordion/accordion.directive';
import { AccordionAnchorDirective } from './shared/accordion/accordionanchor.directive';
import { NavigationListComponent } from './layout/admin/navigation-list/navigation-list.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { AdvertisingPartnersComponent, AgentAuthentication } from './layout/advertising-partners/advertising-partners.component';

// const config: SocketIoConfig = { url: environment.endpoint_url, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    AdminComponent,
    TitleComponent,
    BreadcrumbsComponent,
    NavigationListComponent,
    AdvertisingPartnersComponent,
    AgentAuthentication
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
    HttpClientJsonpModule,
    FormsModule,
    ReactiveFormsModule,
    // SocketIoModule.forRoot(config)
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpInterpritorService, multi: true },CookieService, AccordionLinkDirective, AccordionDirective, AccordionAnchorDirective],
  bootstrap: [AppComponent]
})
export class AppModule { }
