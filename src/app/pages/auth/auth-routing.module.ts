import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SetPasswordComponent } from './set-password/set-password.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: LoginComponent,
      }, 
      {
        path: 'forgot_password',
        component: ForgotPasswordComponent,
      }, 
      {
        path: 'set_password',
        component: SetPasswordComponent,
      }, 
    ] 
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
