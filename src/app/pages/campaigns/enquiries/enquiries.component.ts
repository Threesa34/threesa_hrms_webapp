import { Component, OnInit, Inject} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MastersService } from '../../../services/masters.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import Swal from 'sweetalert2';

import { DetailsComponent } from './sub_modules/details/details.component';

@Component({
  selector: 'app-enquiries',
  templateUrl: './enquiries.component.html',
  styleUrls: ['./enquiries.component.scss']
})
export class EnquiriesComponent implements OnInit {

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


 constructor(private _router : Router, private _MastersService : MastersService, public dialog: MatDialog) { }

 ngOnInit(): void {
   this.initializeParameters();
 }

 initializeParameters()
 {
   this.columnDefs = [
     
     {
       headerName: "Source", 
       field: 'source',
       checkboxSelection: true,
       filterParams: {
         resetButton: true,
         suppressAndOrCondition: true,
         enableCellTextSelection:true,
          ensureDomOrder:true,
       },
     },
     
     {
       headerName: "Client Name", 
       field: 'customername',
       filterParams: {
         resetButton: true,
         suppressAndOrCondition: true,
       },
     },
     {
      headerName: "Client Mail", 
      field: 'email',
      filterParams: {
        resetButton: true,
        suppressAndOrCondition: true,
      },
    },
    {
      headerName: "Client Mobile", 
      field: 'mobile1',
      filterParams: {
        resetButton: true,
        suppressAndOrCondition: true,
      },
    },
     {
       headerName: "Date", 
       field: 'enq_date',
       filterParams: {
         resetButton: true,
         suppressAndOrCondition: true,
       },
     },
     /*{
       headerName: "Status", 
       field: 'approved',
       filterParams: {
         resetButton: true,
         suppressAndOrCondition: true,
       },
     },*/
     
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
 
 this.getWebsiteEnquies();
   
 }

 getWebsiteEnquies()
 {
   this._MastersService.getWebsiteEnquies().subscribe((res:any)=>{
     if(!res.status)
   {
     this.rowData = res;
     this.gridApi.setDomLayout("autoHeight");
   }
   });
 }

 selectedPageSize = '10';
 _pageSizes: any = ['10', '25', '50', '100', 'All'];


 onPageSizeChanged(newageSize) {
   if(newageSize == 'All')
   {
    this.paginationPageSize = parseInt(this.rowData.length)
   }
   else{
    this.paginationPageSize = parseInt(newageSize)
   }
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
   
 }

 ShowEnquiryDetails()
 {
  var dialogRef = this.dialog.open(DetailsComponent,{width: '50%',data:this.selectedRows});
  dialogRef.afterClosed().subscribe(result => {
  });
 }

}
