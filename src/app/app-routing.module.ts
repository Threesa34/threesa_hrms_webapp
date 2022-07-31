import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './layout/admin/admin.component';
import { AuthComponent } from './layout/auth/auth.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'authentication',
        pathMatch: 'full'
      },
      {
        path: 'authentication',
        loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
      }
    ]
  },
  {
    path: 'superadmin',
    component: AdminComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/superadmin/superadmin.module').then(m => m.SuperadminModule)
      },
    ]
  },
  {
    path: 'siteadmin',
    component: AdminComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/siteadmin/siteadmin.module').then(m => m.SiteadminModule)
      },
    ]
  },
  {
    path: 'hr',
    component: AdminComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/hr/hr.module').then(m => m.HrModule)
      },
    ]
  },
  {
    path: 'manager',
    component: AdminComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/manager/manager.module').then(m => m.ManagerModule)
      },
    ]
  },
  {
    path: 'staff',
    component: AdminComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/staff/staff.module').then(m => m.StaffModule)
      },
    ]
  },
  {
    path: 'campaign',
    component: AdminComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/campaigns/campaigns.module').then(m => m.CampaignsModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
