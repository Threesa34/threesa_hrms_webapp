import { Component, OnInit } from '@angular/core';
import { MastersService } from '../../services/masters.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
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

  constructor(public dialog: MatDialog, private _MastersService : MastersService) { }

  ngOnInit(): void {
       var userAgent = sessionStorage.getItem('agentDetails');
      if(!(userAgent != undefined && userAgent != null && userAgent != ''))
      {
        this.openLoginDialog()
      }
      else
      {
        var user = JSON.parse(userAgent);

        this.getAgentEnquiries(user[0].unique_number);
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

}
