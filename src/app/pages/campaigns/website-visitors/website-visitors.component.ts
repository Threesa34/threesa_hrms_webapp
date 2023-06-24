import { Component, OnInit, Inject} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MastersService } from '../../../services/masters.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-website-visitors',
  templateUrl: './website-visitors.component.html',
  styleUrls: ['./website-visitors.component.scss']
})
export class WebsiteVisitorsComponent implements OnInit {

 
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
       headerName: "IP Address", 
       field: 'ip',
       checkboxSelection: true,
       filterParams: {
         resetButton: true,
         suppressAndOrCondition: true,
         enableCellTextSelection:true,
          ensureDomOrder:true,
       },
     },
     
     {
       headerName: "Advertisement", 
       field: 'adv_name',
       filterParams: {
         resetButton: true,
         suppressAndOrCondition: true,
       },
     },
     {
      headerName: "Response", 
      field: 'response',
      filterParams: {
        resetButton: true,
        suppressAndOrCondition: true,
      },
    },
   
     {
       headerName: "Date", 
       field: 'visited_date',
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
 
 this.getWebsiteVisitors();
   
 }

 getWebsiteVisitors()
 {
   this._MastersService.getWebsiteVisitors().subscribe((res:any)=>{
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


}
