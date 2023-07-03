import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { TransactionsComponent } from './transactions/transactions.component';

const routes: Routes = [
  {
  path: '',
    data: {
      breadcrumb: 'Hr',
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
        path: 'profile',
        component: ProfileComponent,
        data: {
          breadcrumb: 'Profile',
          status: true
        },
      }, 
      {
        path: 'transactions',
        component: TransactionsComponent,
        data: {
          breadcrumb: 'Transactions',
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
export class AgentRoutingModule { }
