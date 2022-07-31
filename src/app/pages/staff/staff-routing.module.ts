import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { DashboardComponent } from './dashboard/dashboard.component';

let name = localStorage.getItem("name");

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: name.toUpperCase().replace(/\./g,""),
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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
