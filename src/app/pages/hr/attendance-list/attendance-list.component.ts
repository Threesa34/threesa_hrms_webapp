import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MastersService } from '../../../services/masters.service';
import {MatDatepickerInputEvent} from '@angular/material/datepicker'
@Component({
  selector: 'app-attendance-list',
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.scss']
})
export class AttendanceListComponent implements OnInit {

  
  gridApi;
  gridColumnApi;
  absgridApi;
  absgridColumnApi;
  paginationPageSize = 10;
  columnDefs;
  absColumnDefs;
  defaultColDef;
  columnTypes;
  rowModelType;
  abs_defaultColDef;
  abs_columnTypes;
  rowData:any = [];
  AbsencerowData:any = [];
  rowSelection;
  abs_rowSelection;
  rowGroupPanelShow;
  pivotPanelShow;
  abs_selectedRows:any=[];
  abs_rowGroupPanelShow;
abs_paginationPageSize = 10;
  attendanceid:number;

  attendnaceDate:any;
  constructor(private _router : Router, private _MastersService : MastersService) { }

  ngOnInit(): void {
    this.initializeParameters();

    if (this._MastersService.subsLeavesList==undefined) {    
      this._MastersService.subsLeavesList = this._MastersService.invokeLeavesList.subscribe((name:string) => {    
        this.getAttendanceList();    
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
     //  checkboxSelection: true,
      filterParams: {
        resetButton: true,
        suppressAndOrCondition: true,
      },
    },
    {
      headerName: "In Time", 
      field: 'in_time',
      filterParams: {
        resetButton: true,
        suppressAndOrCondition: true,
      },
    },
    {
      headerName: "In Address", 
      field: 'in_address',
      filterParams: {
        resetButton: true,
        suppressAndOrCondition: true,
      },
    },
    {
      headerName: "Out Time", 
      field: 'out_time',
      filterParams: {
        resetButton: true,
        suppressAndOrCondition: true,
      },
    },
    {
      headerName: "Out Address", 
      field: 'out_address',
      filterParams: {
        resetButton: true,
        suppressAndOrCondition: true,
      },
    },
    
  ];

  this.absColumnDefs = [
    {
      headerName: "Employee Name", 
      field: 'name',
      type: 'text',
     //  checkboxSelection: true,
      filterParams: {
        resetButton: true,
        suppressAndOrCondition: true,
      },
    },
    {
      headerName: "Contact No.", 
      field: 'mobiles',
      filterParams: {
        resetButton: true,
        suppressAndOrCondition: true,
      },
    },
    {
      headerName: "Email", 
      field: 'email',
      filterParams: {
        resetButton: true,
        suppressAndOrCondition: true,
      },
    },
    {
      headerName: "Working Shift", 
      field: 'working_shift',
      filterParams: {
        resetButton: true,
        suppressAndOrCondition: true,
      },
    },
    {
      headerName: "Role", 
      field: 'role_name',
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


   this.abs_defaultColDef = {
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
   this.abs_columnTypes = {
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
   
   this.abs_rowSelection = "multiple";
   this.abs_rowGroupPanelShow = "always";
   this.abs_paginationPageSize = 10;
 }


 onGridReady(params) {
  this.gridApi = params.api;
  this.gridColumnApi = params.columnApi;

  this.getAttendanceList();
}

 onAbsGridReady(params) {
  this.absgridApi = params.api;
  this.absgridColumnApi = params.columnApi;
  this.getAbsenceList();
  
}


GetTabData(event)
{
  if(event == 0)
  {
    this.getAttendanceList();
  }
  else
  {
    
    this.getAbsenceList();
  }
}

getAttendanceList()
{

 

  if(this.attendnaceDate == undefined)
  {
    this.attendnaceDate = new Date();
  }
  this._MastersService.getAttendanceList({attendnaceDate:this.attendnaceDate}).subscribe((res:any)=>{
    if(!res.status)
  {
    this.rowData = res;
    this.gridApi.setDomLayout("autoHeight");
  }
  });
}

getAbsenceList()
{
  if(this.attendnaceDate == undefined)
  {
    this.attendnaceDate = new Date();
  }
  this._MastersService.getAbsenceList({attendnaceDate:this.attendnaceDate}).subscribe((res:any)=>{
    if(!res.status)
  {
    this.AbsencerowData = res;
    this.absgridApi.setDomLayout("autoHeight");
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



}
