import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MastersService } from '../../../services/masters.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import Swal from 'sweetalert2';


const deleteConfirm = {
  title: 'Are you sure?',
  text: 'Want to deacivate selected newsLetter(s)',
  type: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Yes, proceed!',
  cancelButtonText: 'No, keep it'
}

var alertPopup = {
  title: undefined,
  text: undefined,
  type: undefined,
}



@Component({
  selector: 'customer-feedback',
  templateUrl: './sub_modules/customer-feedback.html',
  styleUrls: ['./news-letters-response.component.scss']
})
export class customerFeedback implements OnInit{
  
  feedbackDetails:any = {};

  constructor(private _MastersService : MastersService, @Inject(MAT_DIALOG_DATA) public data: any) {}

  feedbackStatus:any = [
    {status:0, title:"Pending"},
    {status:1, title:"Responsded"},
    {status:2, title:"Cancled"},
]

  ngOnInit(): void {

    this.feedbackDetails['status']=this.data.status;
    this.feedbackDetails['remark']=this.data.remark;
  }

   saveCustomerFeedback()
  {

    this.feedbackDetails['id'] = this.data.id;
   
    this._MastersService.saveCustomerFeedback(this.feedbackDetails).subscribe((res: any) => {
      var resAlert ={
        title: res.title,
        text: res.message,
        type: res.type,
      }
       Swal.fire(resAlert).then((result) => {
        if (res.status === 1) {
          this._MastersService.EmitFeedbackList();
        } else {
        }
      }); 
    });
  } 


}

@Component({
  selector: 'app-news-letters-response',
  templateUrl: './news-letters-response.component.html',
  styleUrls: ['./news-letters-response.component.scss']
})
export class NewsLettersResponseComponent implements OnInit {

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
  responsd_id:number;

 constructor(private _router : Router, private _MastersService : MastersService, public dialog: MatDialog) { }

 ngOnInit(): void {
   this.initializeParameters();

   if (this._MastersService.subsFeedbackList==undefined) {    
    this._MastersService.subsFeedbackList = this._MastersService.invokefeedbackList.subscribe((name:string) => {    
      this.getNewsletterFeedback();    
    });    
  } 
 }

 initializeParameters()
 {
   this.columnDefs = [
     {
       headerName: "Title", 
       field: 'title',
       type: 'text',
       checkboxSelection: true,
       filterParams: {
         resetButton: true,
         suppressAndOrCondition: true,
       },
     },
     {
       headerName: "URL", 
       field: 'shorten_url',
       filterParams: {
         resetButton: true,
         suppressAndOrCondition: true,
       },
     },
     {
       headerName: "Name", 
       field: 'name',
       filterParams: {
         resetButton: true,
         suppressAndOrCondition: true,
       },
     },
     {
       headerName: "Contacts", 
       field: 'contacts',
       filterParams: {
         resetButton: true,
         suppressAndOrCondition: true,
       },
     },
     {
       headerName: "Email", 
       field: 'emails',
       filterParams: {
         resetButton: true,
         suppressAndOrCondition: true,
       },
     },
     {
       headerName: "Address", 
       field: 'message',
       filterParams: {
         resetButton: true,
         suppressAndOrCondition: true,
       },
     },
     {
       headerName: "Creation Date", 
       field: 'created_date',
       filterParams: {
         resetButton: true,
         suppressAndOrCondition: true,
       },
     },
     {
       headerName: "Status", 
       field: '_status',
       filterParams: {
         resetButton: true,
         suppressAndOrCondition: true,
       },
     },
     {
       headerName: "Remark", 
       field: 'remark',
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
   
   this.rowSelection = "multiple";
   this.rowGroupPanelShow = "always";
   this.paginationPageSize = 10;
 }

 onGridReady(params) {
   this.gridApi = params.api;
   this.gridColumnApi = params.columnApi;
 
 this.getNewsletterFeedback();
   
 }

 getNewsletterFeedback()
 {
   this._MastersService.getNewsletterFeedback().subscribe((res:any)=>{
     if(!res.status)
   {
     this.rowData = res;
     this.gridApi.setDomLayout("autoHeight");
   }
   });
 }



 onPageSizeChanged(newageSize) {
   var value = this.paginationPageSize;
   this.gridApi.paginationSetPageSize(Number(value));
 }
 
 
 onSelectionChanged(event) {
   this.selectedRows = this.gridApi.getSelectedRows();
   var selectedRowsString = "";
   this.selectedRows.forEach(function(selectedRow, index) {
     if (index !== 0) {
       selectedRowsString += ", ";
     }
     selectedRowsString += selectedRow.athlete;
   });
   this.responsd_id = this.selectedRows[0].id;
 }

 openDialog(){  
  var dialogRef = this.dialog.open(customerFeedback,{width: '50%',data:this.selectedRows[0]});
  dialogRef.afterClosed().subscribe(result => {
  });
}

}
