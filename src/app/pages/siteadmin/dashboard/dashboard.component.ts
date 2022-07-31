import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MastersService } from '../../../services/masters.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4maps from "@amcharts/amcharts4/maps"
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import {ChartModule} from 'primeng/chart';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  data: any;
  _id:any;
  count:any = {
    products:4000,
    locations:26,
    product_units:12550,
    orders:767
  }


  

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


  constructor(private _router : Router, private _MastersService : MastersService, private cookieService: CookieService,) { }

  ngOnInit(): void {
    if(localStorage.getItem('_id') && parseInt(localStorage.getItem('_id')) > 0){

      this._year = new Date().getFullYear();
      this.salary_month = this._month[new Date().getMonth()]+', '+this._year;
      this.total_days = new Date(new Date().getFullYear(), new Date().getMonth(), 0).getDate();
  

      this.getUserProfile();
      this.getAttendanceStatus();
      this.getMobileDashboardRecord();
    }
   

    this._id = localStorage.getItem('_id');
  /*   this._MastersService
      .getMessages()
      .subscribe((message: string) => {
        // this.messageList.push(message);
      }); */

/*     this.LoadChart();
    this.loadPieChart();
    this.loadPieChart();
    this.LoadLineChart(); */
    this.getUsersList();
  }


  LoadLineChart()
  {
    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
          {
              label: 'Purchase',
              data: [65, 59, 80, 81, 56, 55, 40],
              fill: false,
              borderColor: '#4bc0c0'
          },
          {
              label: 'Sell',
              data: [28, 48, 40, 19, 86, 27, 90],
              fill: false,
              borderColor: '#565656'
          }
      ]
  }
  }
  messageService:any;
  selectData(event) {
    this.messageService.add({severity: 'info', summary: 'Data Selected', 'detail': this.data.datasets[event.element._datasetIndex].data[event.element._index]});
}

barchart_data: any;
  LoadChart()
  {
    this.barchart_data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
          {
              label: 'Stock Available',
              backgroundColor: '#42A5F5',
              borderColor: '#1E88E5',
              data: [65, 59, 80, 81, 56, 55, 40]
          },
          {
              label: 'Orders',
              backgroundColor: '#9CCC65',
              borderColor: '#7CB342',
              data: [28, 48, 40, 19, 86, 27, 90]
          },
          {
              label: 'delivered Orders',
              backgroundColor: '#FF5470',
              borderColor: '#FF007C',
              data: [8, 18, 62, 49, 26, 41, 71]
          }
      ]
  }
  }

  pie_data:any;
  loadPieChart()
  {

    var loanData;
    this._MastersService.getDashboardLoanData().subscribe((res:any)=>{
      if(!res.status)
    {
      loanData = res;
      this.pie_data = {
        labels: ['Loan Requests','Loan Reciepts'],
        datasets: [
            {
                data: loanData,
                backgroundColor: [
                    "#FF355E",
                    "#87FF2A",
                ],
                hoverBackgroundColor: [
                    "#FF355E",
                    "#87FF2A",
                ]
            }]    
        };
    }
    });


    
  }

  usersList:any;

  getUsersList()
  {
    this._MastersService.getRestUsersList().subscribe((res:any)=>{
        this.usersList = res;
    });
  }

  showChatBox:boolean;
  selectedUser:any;
  chatLogDetails:any;
  /* getChat(data)
  {
      this.selectedUser = data;
      this.showChatBox = true;

      this._MastersService.getChatLog(data.id).subscribe((res:any)=>{
        this.chatLogDetails = res;
    });
  } */


  showImage(imgfile)
  {

    var resAlert ={
      imageUrl: 'http://103.252.7.5:8895/uploads/employee/'+imgfile,
        imageWidth: 400,
        imageHeight: 400,
        animation: true,
      showCancelButton: false,
    showConfirmButton: false
    }
     Swal.fire(resAlert).then((result) => {
     
    });
  
  }
 
  chatDetails:any = {
    msg:''
  };

 /*  sendMessage() {
    this.chatDetails.reciever = this.selectedUser.id;
    this.chatDetails.sender = this._id;
    this._MastersService.sendMessage(this.chatDetails);
    this.chatDetails.msg = '';
  } */

 





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
