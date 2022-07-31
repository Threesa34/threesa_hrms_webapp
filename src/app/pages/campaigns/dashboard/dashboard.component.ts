import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { MastersService } from '../../../services/masters.service';
import { environment } from '../../../../environments/environment';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

 

  intime: any = '';
  outtime: any = '';
  lastPunch: any = '';
  name:String='';
  role:String='';
  present_days:number = 0;
  total_days:number = 0;
  _year:number = 0;
  salary_month:any;
  _month:any = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];


  userDetails:any = {};
  profilepic:any;

  constructor(private _MastersService: MastersService, private cookieService: CookieService,) { }

  ngOnInit(): void {
    if(localStorage.getItem('_id') && parseInt(localStorage.getItem('_id')) > 0){

      this._year = new Date().getFullYear();
      this.salary_month = this._month[new Date().getMonth()]+', '+this._year;
      this.total_days = new Date(new Date().getFullYear(), new Date().getMonth(), 0).getDate();
  

      this.getUserProfile();
      this.getAttendanceStatus();
      this.getMobileDashboardRecord();
    }
    
  }

  getUserProfile()
{
this._MastersService.getUserProfile(localStorage.getItem('_id')).subscribe((res:any)=>{
  if(res.id)
{
  this.userDetails = res;      
  this.profilepic = environment.endpoint_url+'/uploads/employee/'+this.userDetails.profile_pic;
        
}
});

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
        if(res.result != undefined)
        {
        if(res.result.intime != undefined && res.result.intime != null && res.result.intime != '')
        {
          this.intime = res.result.intime.substr(0, res.result.intime.length - 3);
         
        }
        else
        {
          this.intime = '--:--';
         
        }
        if(res.result.outtime != undefined && res.result.outtime != null && res.result.outtime != '')
        {
          this.outtime = res.result.outtime.substr(0, res.result.outtime.length - 3);
        }
        else
        {
          this.outtime = '--:--';
          
        }

        
        if((res.result.intime == undefined || res.result.intime == null || res.result.intime != '') && (res.result.outtime == undefined || res.result.outtime == null || res.result.outtime == '')){
          this.lastPunch = '--:--';
        }
        if(res.result.intime != undefined && res.result.intime != null && res.result.intime != '')
        {
          this.lastPunch = res.result.intime.substr(0, res.result.intime.length - 3);
        }
        if(res.result.outtime != undefined && res.result.outtime != null && res.result.outtime != '')
        {
          this.lastPunch = res.result.outtime.substr(0, res.result.outtime.length - 3);
        }
      }
      else
      {
        this.lastPunch = '--:--';
        this.intime = '--:--';
        this.outtime = '--:--';
      }
        
      }
    });
  }

  dashboardRecord:any = {};

  getMobileDashboardRecord()
  {
    this._MastersService.getMobileDashboardRecord().subscribe((res:any)=>{
      if(res[0].id)
    {
      this.dashboardRecord = res[0];      
      
            
    }
    });
    
  }



}
