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
  selector: 'app-locations-list',
  templateUrl: './locations-list.component.html',
  styleUrls: ['./locations-list.component.scss']
})
export class LocationsListComponent implements OnInit {

  
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
  locationid:number;

 constructor(private _router : Router, private _SiteadminService : SiteadminService) { }


  ngOnInit(): void {
    this.initializeParameters();
  }

  
 initializeParameters()
 {
   this.columnDefs = [
     {
       headerName: "Location", 
       field: 'name',
       type: 'text',
       checkboxSelection: true,
       filterParams: {
         resetButton: true,
         suppressAndOrCondition: true,
       },
     },
     {
       headerName: "Contact No(s)", 
       field: 'contacts',
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
       headerName: "Manager", 
       field: 'manager_name',
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
 
 this.getLocationsList();
   
 }

 getLocationsList()
 {
   this._SiteadminService.getLocationsList().subscribe((res:any)=>{
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
   this.locationid = this.selectedRows[0].id;
 }

/*  deleteusers()
 {
   var userids = '';
   this.selectedRows.map(function(value)
   {
     userids = userids+value.id+',';
   });

   userids = userids.substr(0, userids.length - 1);
   
   Swal.fire(deleteConfirm).then((result) => {
     if (result.value) {
   this._MastersService.deleteUsers({userids:userids}).subscribe((res: any) => {
     alertPopup.text = res.message;
     alertPopup.title = res.title;
     alertPopup.type = res.type;

     Swal.fire(alertPopup).then((result) => {
       if (res.status === 0) {
 
       } else {
         this.getLocationsList()
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
 
 } */

}
