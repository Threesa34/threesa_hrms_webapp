import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from '../../../services/authentication.service';
import Swal from 'sweetalert2';

var alertPopup = {
  title: undefined,
  text: undefined,
  type: undefined,
}


@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss']
})
export class SetPasswordComponent implements OnInit {

  passwordDetail:any = {};
  _formGroup = {
    new_password: this.passwordDetail.new_password,
    confirm_password:this.passwordDetail.confirm_password
  }
  
  changePassword:any;

  get password() {
    return this.passwordDetail.get('new_password');
  }

  constructor(private _router : Router, private cookieService: CookieService, private fb: FormBuilder, private _AuthenticationService: AuthenticationService) { 
    this.changePassword = this.fb.group(this._formGroup); 
  }

  ngOnInit(): void {
  }


  onPasswordStrengthChanged(strength) {
    // console.log('onPasswordStrengthChanged', strength);
  }

  UpdatePassword()
  {
    this._AuthenticationService.setNewPassword(this.passwordDetail).subscribe((res: any) => {

      var resAlert ={
        title: res.title,
        text: res.message,
        type: res.type,
        }

       Swal.fire(resAlert).then((result) => {
        if(res.status == 1)
        {
            if(localStorage.getItem('role') != undefined)
            {
                  this._router.navigate(['/'+localStorage.getItem('role').toLowerCase()]);
            }
            else{
              this._router.navigate(['/authentication']);
            }
        }
        }); 
   

      
    });
  }

}
