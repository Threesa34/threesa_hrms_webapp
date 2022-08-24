import { Component, OnInit, Inject} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MastersService } from '../../../../../services/masters.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-confirm-connection',
  templateUrl: './confirm.connection.component.html',
  styleUrls: ['./details.component.scss']
})
export class ConfirmConnectionComponent implements OnInit {

  enquiryDetails:any;
  connectionDetails:any = {};

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _MastersService: MastersService) { }

  ngOnInit(): void {
    this.enquiryDetails = this.data;
    this.getStaffUsersList();
    this.getConnectionDetais();
  }

  _connectionStatus:any =   [
    {value:0, title:'Pending'},
    {value:1, title:'Connection Done'},
    {value:2, title:'Rejected / Denied'},
  ]

  usersList:any;

  getConnectionDetais()
  {
    this.connectionDetails = {
      id: this.enquiryDetails[0].id,
      conectionstats: this.enquiryDetails[0].conectionstats,
      userid: this.enquiryDetails[0].userid,
      connectiondate: this.enquiryDetails[0].connectiondate,
      plan: this.enquiryDetails[0].plan,
      connremark: this.enquiryDetails[0].connremark

    }
  }

  getStaffUsersList()
  {
    this._MastersService.getStaffUsersList().subscribe((res:any)=>{
      if(!res.status)
      {
        this.usersList = res;
      }
    });
    
  }

  SaveConnectionStatus()
  {
    this.connectionDetails.id = this.enquiryDetails[0].id;

    this._MastersService.SaveConnectionStatus(this.connectionDetails).subscribe((res: any) => {
      var resAlert ={
        title: res.title,
        text: res.message,
        type: res.type,
      }
       Swal.fire(resAlert).then((result) => {
        if (res.status === 1) {
          this._MastersService.EmitEnquiryList();
        } else {
        }
      }); 
    });
  } 

  

}


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  enquiryDetails:any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.enquiryDetails = this.data;
    this.generateEnquirySharingText();
  }

  enquiryText:String;
  generateEnquirySharingText()
  {
      var generatedText = '-- New Enquiry -- \t\n\n\n\n';
      if(this.enquiryDetails[0].enq_date != undefined && this.enquiryDetails[0].enq_date != null && this.enquiryDetails[0].enq_date != '')
      {
        generatedText = generatedText + "Enquiry Date: "+this.enquiryDetails[0].enq_date+'. \t';
      }
      if(this.enquiryDetails[0].customername != undefined && this.enquiryDetails[0].customername != null && this.enquiryDetails[0].customername != '')
      {
        generatedText = generatedText + "Customer Name: "+this.enquiryDetails[0].customername+' \t';
      }
      if(this.enquiryDetails[0].mobile1 != undefined && this.enquiryDetails[0].mobile1 != null && this.enquiryDetails[0].mobile1 != '')
      {
        generatedText = generatedText + "Contact Number: "+this.enquiryDetails[0].mobile1+', \t';
      }
      if(this.enquiryDetails[0].email != undefined && this.enquiryDetails[0].email != null && this.enquiryDetails[0].email != '')
      {
        generatedText = generatedText + "Email: "+this.enquiryDetails[0].email+', \t';
      }
      if(this.enquiryDetails[0].address != undefined && this.enquiryDetails[0].address != null && this.enquiryDetails[0].address != '')
      {
        generatedText = generatedText + "Address: "+this.enquiryDetails[0].address+', \t';
      }
      if(this.enquiryDetails[0].comment != undefined && this.enquiryDetails[0].comment != null && this.enquiryDetails[0].comment != '')
      {
        generatedText = generatedText + "Comment: "+this.enquiryDetails[0].comment+', \t';
      }
      if(this.enquiryDetails[0].custome_message != undefined && this.enquiryDetails[0].custome_message != null && this.enquiryDetails[0].custome_message != '')
      {
        generatedText = generatedText + "Message: "+this.enquiryDetails[0].custome_message+', \t';
      }

      this.enquiryText = generatedText;
  }

}
