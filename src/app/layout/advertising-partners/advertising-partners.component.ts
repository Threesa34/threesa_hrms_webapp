import { Component, OnInit, ChangeDetectorRef, OnDestroy, HostBinding } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Router} from '@angular/router';
import { MenuItems } from '../../shared/menu-items/menu-items';
import { CookieService } from 'ngx-cookie-service';
import {  FormControl } from '@angular/forms';
import { PerfectScrollbarConfigInterface,
  PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MastersService } from '../../services/masters.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agent-authentication',
  templateUrl: './agent-authentication.component.html',
  styleUrls: ['./advertising-partners.component.scss']
})
export class AgentAuthentication implements OnInit {

  mobile_no:any;
  constructor(public dialogRef: MatDialogRef<AgentAuthentication>, private _MastersService : MastersService) { }

  ngOnInit(): void {
  }

  AuthenticateAgent()
  {
    this._MastersService.AuthenticateAgent({mobile: this.mobile_no}).subscribe((res: any) => {
      var resAlert ={
        title: res.title,
        text: res.message,
        type: res.type,
      }
      if(res.status && res.status == 0)
      {
       Swal.fire(resAlert).then((result) => {
        if (res.status === 1) {
          
        } else {
        }
      }); 
      }
      else
      {
        sessionStorage.setItem('agentDetails', JSON.stringify(res));
        this.dialogRef.close();
      }
    });
  } 

}

@Component({
  selector: 'app-advertising-partners',
  templateUrl: './advertising-partners.component.html',
  styleUrls: ['./advertising-partners.component.scss']
})
export class AdvertisingPartnersComponent implements OnInit {

  showEnquiryList: boolean = false;

  mobileQuery: MediaQueryList;
  public config: PerfectScrollbarConfigInterface = {};
  userRole:String = '';
  menuList :any = [];
  toggleControl = new FormControl(false);
  @HostBinding('class') className = '';
  hideBtn:boolean;

  private platform: any;
  private service: any;


  constructor(public dialog: MatDialog, public menuItems: MenuItems, public router: Router, private cookieService: CookieService,public _MastersService: MastersService) {
    this.userRole =  localStorage.getItem('role');
    this.userRole = this.userRole.toLocaleLowerCase();
    
    this.menuList = [];
    
    this.menuList = this.menuItems.getMenusAgainstUserRol(this.userRole);


   }



  ngOnInit(): void {
      //  var userAgent = sessionStorage.getItem('agentDetails');
      // if(!(userAgent != undefined && userAgent != null && userAgent != ''))
      // {
      //   this.openLoginDialog()
      // }
      // else
      // {
      //   var user = JSON.parse(userAgent);
      //   if(user && user.length > 0)
      //   this.getAgentEnquiries(user[0].unique_number);
      // }
  }

  toggleSubMenu(_obj)
  {
    this.menuList[0].main.map((value)=>{
      if (value.state != _obj.state && value.children && value.children.length)
        value.expanded = false;
    });

    if (_obj.children && _obj.children.length) {
      if(_obj.expanded != true)
      _obj.expanded = true;
      else
      _obj.expanded = false;
    } 
  }

  enquiryList:any;
  getAgentEnquiries(unique_id)
  {
    this._MastersService.getAgentEnquiries(unique_id).subscribe((res:any)=>{
      if(!res.status)
    {
        if(res.length > 0)
        {
            this.enquiryList = res;
            this.showEnquiryList = true;
        }
    }
    });
  }

  getConnectionCount()
  {
      return this.enquiryList.filter((val)=>{
        return val.conectionstats == 1;
      }).length
  }

  openLoginDialog()
  {
     var dialogRef = this.dialog.open(AgentAuthentication,{width: '50%'});
     dialogRef.afterClosed().subscribe(result => {
      var userAgent = sessionStorage.getItem('agentDetails');
      if(userAgent != undefined && userAgent != null && userAgent != '')
      {
        var user = JSON.parse(userAgent);

        this.getAgentEnquiries(user[0].unique_number);

      }
     });
    
  }

  deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

  SignOut()
  {
    this._MastersService.SignOut().subscribe((res:any)=>{
      if(res)
      {
        this.deleteAllCookies();
        localStorage.clear();
        this.cookieService.deleteAll();
        var resAlert ={
          title: res.title,
          text: res.message,
          type: res.type,
        }
         Swal.fire(resAlert).then((result) => {
          
            this.router.navigate(['/']);
          }); 
      }
    });
  }

}
