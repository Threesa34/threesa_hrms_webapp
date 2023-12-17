import { Component, OnInit, Inject } from '@angular/core';
import { MastersService } from '../../../services/masters.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-partner-payment',
  templateUrl: './partner-payment.component.html',
  styleUrls: ['./partner-payment.component.scss']
})
export class PartnerPaymentComponent implements OnInit {


  
  gridApi;
  gridColumnApi;
  paginationPageSize = 10;
  columnDefs;
  defaultColDef;
  columnTypes;
  rowModelType;
  rowData:any = [];
  rowSelection;
  rowGroupPanelShow;
  pivotPanelShow;
  selectedRows:any=[];

  paymentDetails:any = {};
  constructor(private _MastersService: MastersService, public dialogRef: MatDialogRef<PartnerPaymentComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  personDetails: any = {};
  ngOnInit(): void {
    if(this.data != undefined && this.data != null && this.data != '')
    {
      this.personDetails = this.data[0];
    }
  }

  savePartnerPaymentDetails()
  {

    if(this.paymentDetails.redeem_points != undefined && this.paymentDetails.redeem_points != null && parseFloat(this.paymentDetails.redeem_points) > 0)
    {
      if(parseFloat(this.paymentDetails.redeem_points) > ((this.personDetails.totalConnections * this.personDetails.creditpoints) - this.personDetails.total_redeem_points))
      {
        var resAlert ={
          title: "Error",
          text: "Credit Points (Amount) is greater than total redeem points",
          type: 'error',
        }
         Swal.fire(resAlert).then((result) => {
          }
        ); 
      }
      else
      {
      this.paymentDetails['agentid'] = this.personDetails.id;
      this._MastersService.savePartnerPaymentDetails(this.paymentDetails).subscribe((res: any) => {
        var resAlert ={
          title: res.title,
          text: res.message,
          type: res.type,
        }
         Swal.fire(resAlert).then((result) => {
          if (res.status === 1) {
            this.dialogRef.close();
            this._MastersService.EmitPartnersList();
          } else {
          }
        }); 
      });
    }
    }
  }


  
 initializeTableParameters()
 {
   this.columnDefs = [
     
     {
       headerName: "Date", 
       field: 'paymentDate',
       filterParams: {
         resetButton: true,
         suppressAndOrCondition: true,
         enableCellTextSelection:true,
        ensureDomOrder:true,
       },
     },
     
     {
       headerName: "Credited Points", 
       field: 'redeem_points',
       filterParams: {
         resetButton: true,
         suppressAndOrCondition: true,
       },
     }, 
   ];
   this.defaultColDef = {
     flex: 1,
     minWidth: 100,
     sortable: true,
     resizable: true,
     enableRowGroup: true,
     enablePivot: true,
     enableValue: true,
     editable: true,
     filter: true,
     menuTabs: ['filterMenuTab'],
   };
   this.columnTypes = {
     text: { filter: 'agTextColumnFilter' },
     number: { filter: 'agNumberColumnFilter' },
     numberWithFilterReset: {
       filter: 'agNumberColumnFilter',
       filterParams: {
         resetButton: true,
         debounceMs: 1500,
       },
     },
   };
   
   this.rowSelection = "single";
   this.rowGroupPanelShow = "always";
   this.paginationPageSize = 10;
 }

 onGridReady(params) {
   this.gridApi = params.api;
   this.gridColumnApi = params.columnApi;
 
 this.getAgentPaymentHistory();
   
 }

  getAgentPaymentHistory()
 {
   this._MastersService.getAgentPaymentHistory(this.personDetails.id).subscribe((res:any)=>{
     if(!res.status)
   {
     this.rowData = res;
     this.gridApi.setDomLayout("autoHeight");
   }
   });
 }

  emitEventsOnTabChange(event: any)
  {
    if(event.index == 1)
    {
        this.initializeTableParameters()
    }
  }

}
