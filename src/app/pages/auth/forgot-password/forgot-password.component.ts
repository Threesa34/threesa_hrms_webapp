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
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  
  
  userdetails:any = {};
  _formGroup = {
    email: this.userdetails.email,
  }
  
  changePassword:any;

  

  constructor(private _router : Router, private cookieService: CookieService, private fb: FormBuilder, private _AuthenticationService: AuthenticationService) { 
    this.changePassword = this.fb.group(this._formGroup); 
  }

  ngOnInit(): void {
  }





}
