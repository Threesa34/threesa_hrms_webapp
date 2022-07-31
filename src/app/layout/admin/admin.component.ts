import { Component, OnInit, ChangeDetectorRef, OnDestroy, HostBinding } from '@angular/core';
import {Router} from '@angular/router';
import { MenuItems } from '../../shared/menu-items/menu-items';
import { CookieService } from 'ngx-cookie-service';
import {  FormControl } from '@angular/forms';
import { PerfectScrollbarConfigInterface,
  PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MastersService } from '../../services/masters.service';
import Swal from 'sweetalert2';

declare var H: any;

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({transform: 'rotate(0deg)'})),
      state('expanded', style({transform: 'rotate(180deg)'})),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class AdminComponent implements OnInit {

  mobileQuery: MediaQueryList;
  public config: PerfectScrollbarConfigInterface = {};
  userRole:String = '';
  menuList :any = [];
  toggleControl = new FormControl(false);
  @HostBinding('class') className = '';
  hideBtn:boolean;

  private platform: any;
  private service: any;

  folders: Section[] = [
    {
      name: 'Mayur P. Mhatre have birthday today. Want to wish him?',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    }
  ];
  notes: Section[] = [
    {
      name: 'Vacation Itinerary',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16'),
    }
  ];

  constructor(public menuItems: MenuItems, public router: Router, private cookieService: CookieService,public _MastersService: MastersService) {

    this.userRole =  localStorage.getItem('role');
    this.userRole = this.userRole.toLocaleLowerCase();
    
    this.menuList = [];
    
    this.menuList = this.menuItems.getMenusAgainstUserRol(this.userRole);


    
    this.platform = new H.service.Platform({
      "apikey": "STUm3K3RBB8Iw83LByhNvDt5eEeekrrvv8GVVIgxKaA"
  });

  this.service = this.platform.getSearchService();

   }


  ngOnInit(): void {
    // this.getAttendanceStatus();
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


  SetAttendance()
  {

     this._MastersService.getPosition().then(pos=>
      {

        var time = new Date();
        pos['time'] = time;
        var attendanceDetails = {date: new Date()};

        //  = item.address.label;

        for(var i = 0; i < Object.keys(pos).length;i++)
        {
          attendanceDetails[Object.keys(pos)[i]] = pos[Object.keys(pos)[i]];
        }
  
        this._MastersService.getAddress(pos).subscribe((res:any)=>{
         attendanceDetails['address'] = res.Label+', '+res.PostalCode;
         attendanceDetails['time'] = res.attendnace_time;
         var resAlert ={
          title: 'Address: '+attendanceDetails['address'],
          html: '<div class="col-12"><p><b>Time: '+attendanceDetails['time']+'</b></p></div>',
          type: "warning",
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: 'Confirm',
          cancelButtonText: "Refresh / Cancel",
        }
         Swal.fire(resAlert).then((result) => {
          if (result.isConfirmed) {
            this.submitAttendance(attendanceDetails);        // submitting the form when user press yes
          } 
          else {

            var resAlert ={
              title: 'Do you want to refresh the attendance details or cancel attendance request?',
             
              type: "warning",
              showConfirmButton: true,
              showCancelButton: true,
              confirmButtonText: 'Refresh',
              cancelButtonText: "Cancel",
            }
             Swal.fire(resAlert).then((result) => {
              if (result.isConfirmed) {
                this.SetAttendance();      // submitting the form when user press yes
              } else {
               
              }
              
              // <div class="col-12"><button type="button" class="btn btn-primary" (click)="submitAttendance('+attendanceDetails+')">Submit</button>&nbsp;<button type="button" class="btn btn-primary">Refresh</button></div>
              }); 
          }
          
          // <div class="col-12"><button type="button" class="btn btn-primary" (click)="submitAttendance('+attendanceDetails+')">Submit</button>&nbsp;<button type="button" class="btn btn-primary">Refresh</button></div>
          }); 
        });


       

        // console.log(attendanceDetails)
      }); 
  }

  submitAttendance(attendanceDetails)
  {
    this._MastersService.setAttendance(attendanceDetails).subscribe((res:any)=>{
      if(res)
      {
        var resAlert ={
          title: res.title,
          text: res.message,
          type: res.type,
        }
         Swal.fire(resAlert).then((result) => {
          // this.router.navigate(['/']);
          this.getAttendanceStatus();
          }); 
      }
    });
  }
  
  attendanceStatus:any;
  getAttendanceStatus()
  {
    this._MastersService.getAttendanceStatus().subscribe((res:any)=>{
      if(res)
      {
        this.attendanceStatus = res.status;
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
