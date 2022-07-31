import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersDetailsComponent } from './users-details/users-details.component';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Superadmin',
      status: true
    },
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
        
      }, 
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: {
          breadcrumb: 'Dashboard',
          status: true
        },
      }, 
      {
        path: 'componies',
        component: CompanyListComponent,
        data: {
          breadcrumb: 'Companies',
          status: true
        },
      }, 
      {
        path: 'compony_details/:id',
        component: CompanyDetailsComponent,
        data: {
          breadcrumb: 'Company Details',
          status: true
        },
      }, 
      {
        path: 'users',
        component: UsersListComponent,
        data: {
          breadcrumb: 'Users',
          status: true
        },
      }, 
      {
        path: 'user_details/:id',
        component: UsersDetailsComponent,
        data: {
          breadcrumb: 'User Details',
          status: true
        },
      }, 
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperadminRoutingModule { }

