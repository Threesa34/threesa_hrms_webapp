import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SiteadminService } from '../../../services/siteadmin.service';
import Swal from 'sweetalert2';

const deleteConfirm = {
  title: 'Are you sure?',
  text: 'Want to deacivate selected Users/users',
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
  selector: 'app-vendors-list',
  templateUrl: './vendors-list.component.html',
  styleUrls: ['./vendors-list.component.scss']
})
export class VendorsListComponent implements OnInit {

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
  vendorid:number;

 constructor(private _router : Router, private _SiteadminService : SiteadminService) { }


  ngOnInit(): void {
    this.initializeParameters();
  }

  initializeParameters()
  {
    this.columnDefs = [
      {
        headerName: "Name", 
        field: 'name',
        type: 'text',
        checkboxSelection: true,
        filterParams: {
          resetButton: true,
          suppressAndOrCondition: true,
        },
      },
      {
        headerName: "Owner", 
        field: 'owner',
        filterParams: {
          resetButton: true,
          suppressAndOrCondition: true,
        },
      },
      {
        headerName: "Mobile No(s)", 
        field: 'mobiles',
        filterParams: {
          resetButton: true,
          suppressAndOrCondition: true,
        },
      },
      {
        headerName: "Email(s)", 
        field: 'emails',
        filterParams: {
          resetButton: true,
          suppressAndOrCondition: true,
        },
      },
      {
        headerName: "Landline No(s)", 
        field: 'landlines',
        filterParams: {
          resetButton: true,
          suppressAndOrCondition: true,
        },
      },
      {
        headerName: "GSTIN", 
        field: 'gstin',
        filterParams: {
          resetButton: true,
          suppressAndOrCondition: true,
        },
      },
      {
        headerName: "Status", 
        field: 'status',
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
 
 this.getVendorsList();
   
 }

 getVendorsList()
 {
   this._SiteadminService.getVendorsList().subscribe((res:any)=>{
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
   this.vendorid = this.selectedRows[0].id;
 }

}
