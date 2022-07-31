import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MastersService } from '../../../services/masters.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';

const deleteConfirm = {
  title: 'Are you sure?',
  text: 'Want to delete these details',
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
  selector: 'leaves-details',
  templateUrl: 'leaves-details.html'
})
export class leavesDetails implements OnInit{
  
  leaveDetails:any = {};
 userRole:any;
  approvalStatus:any = [
    {id:0,title:'Pending'},
    {id:1,title:'Approved'},
    {id:2,title:'Denied'},
  ]
  leaveTypes:any=[
    'Full Day',
    'First Half Day',
    'Second Half Day'
  ]
  constructor(private _MastersService : MastersService, private cookieService: CookieService, @Inject(MAT_DIALOG_DATA) public data: Number) {}

  ngOnInit(): void {
    this.userRole = localStorage.getItem('role');
    if(this.data != undefined && this.data > 0)
    {
        this.getleaveDetails(this.data)
    }
  }


  
  getleaveDetails(id)
  {
    this._MastersService.getleaveDetails(id).subscribe((res:any)=>{
      if(!res.status)
      {
        this.leaveDetails = res[0];
      }
    });
    
  }

   saveLeaveDetails()
  {
    this._MastersService.saveLeaveDetails(this.leaveDetails).subscribe((res: any) => {
      var resAlert ={
        title: res.title,
        text: res.message,
        type: res.type,
      }
       Swal.fire(resAlert).then((result) => {
        if (res.status === 1) {
          this._MastersService.EmitLeavesList();
        } else {
        }
      }); 
    });
  } 

  deleteLeaveDetails()
  {
    Swal.fire(deleteConfirm).then((result) => {
      if (result.value) {
    this._MastersService.deleteLeaveDetails(this.data).subscribe((res: any) => {
      alertPopup.text = res.message;
      alertPopup.title = res.title;
      alertPopup.type = res.type;
 
      Swal.fire(alertPopup).then((result) => {
        if (res.status === 0) {
  
        } else {
          this._MastersService.EmitLeavesList();
        }
      });
    });
  } else if (result.dismiss === Swal.DismissReason.cancel) {
    Swal.fire(
      'Cancelled',
      'Your imaginary file is safe :)',
      'error'
    )
  }
  });
  }


}



@Component({
  selector: 'app-leave-management',
  templateUrl: './leave-management.component.html',
  styleUrls: ['./leave-management.component.scss']
})
export class LeaveManagementComponent implements OnInit {

  
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
  leaveid:number;

  constructor(private _router : Router, private _MastersService : MastersService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.initializeParameters();

    if (this._MastersService.subsLeavesList==undefined) {    
      this._MastersService.subsLeavesList = this._MastersService.invokeLeavesList.subscribe((name:string) => {    
        this.getLeavesList();    
      });    
    } 
  }

  initializeParameters()
 {
   this.columnDefs = [
     {
       headerName: "Employee Name", 
       field: 'emp_name',
       type: 'text',
       checkboxSelection: true,
       filterParams: {
         resetButton: true,
         suppressAndOrCondition: true,
       },
     },
     {
       headerName: "Leave Type", 
       field: 'leave_type',
       filterParams: {
         resetButton: true,
         suppressAndOrCondition: true,
       },
     },
     {
       headerName: "Date From", 
       field: 'from_date',
       filterParams: {
         resetButton: true,
         suppressAndOrCondition: true,
       },
     },
     {
       headerName: "To", 
       field: 'to_date',
       filterParams: {
         resetButton: true,
         suppressAndOrCondition: true,
       },
     },
     {
       headerName: "Approval Status", 
       field: 'approval',
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

this.getLeavesList();
  
}

getLeavesList()
{
  this._MastersService.getLeavesList().subscribe((res:any)=>{
    if(!res.status)
  {
    this.rowData = res;
    this.selectedRows = [];
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
  if(this.selectedRows.length > 0)
  this.leaveid = this.selectedRows[0].id;
}

openDialog(type){

  if(type == 'new')
  {
    var dialogRef = this.dialog.open(leavesDetails,{width: '50%',data:0});
  }
  if(type =='edit')
  {
    var dialogRef = this.dialog.open(leavesDetails,{width: '50%',data:this.leaveid});
  }

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
}
}
