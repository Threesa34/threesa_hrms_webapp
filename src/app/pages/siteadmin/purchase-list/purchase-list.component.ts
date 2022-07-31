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
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.scss']
})
export class PurchaseListComponent implements OnInit {

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
  purchaseid:number;

 constructor(private _router : Router, private _SiteadminService : SiteadminService) { }


  ngOnInit(): void {
    this.initializeParameters();
  }

  
 initializeParameters()
 {
   this.columnDefs = [
     {
       headerName: "Vendor", 
       field: 'vendor_name',
       type: 'text',
       checkboxSelection: true,
       filterParams: {
         resetButton: true,
         suppressAndOrCondition: true,
       },
     },
     {
       headerName: "Purchase Date", 
       field: '_po_date',
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
     /* {
       headerName: "Gross Amount", 
       field: 'gross_amount',
       filterParams: {
         resetButton: true,
         suppressAndOrCondition: true,
       },
     },
     {
       headerName: "GST", 
       field: 'total_gst',
       filterParams: {
         resetButton: true,
         suppressAndOrCondition: true,
       },
     },
     {
       headerName: "Net Amount", 
       field: 'net_amount',
       filterParams: {
         resetButton: true,
         suppressAndOrCondition: true,
       },
     }, */
     {
       headerName: "Created Date", 
       field: '_createddate',
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
 
 this.getPurchaseList();
   
 }

 getPurchaseList()
 {
   this._SiteadminService.getPurchaseList().subscribe((res:any)=>{
     if(!res.status)
   {
     this.rowData = res;
     this.gridApi.setDomLayout("autoHeight");
   }
   });
 }

 enableGrEntry:boolean = false;
 verifyGoodsEntryExist(poid, selectedObject)
 {
   if(selectedObject[0].status == 1)
   {
   this._SiteadminService.verifyGoodsEntryExist(poid).subscribe((res:any)=>{
     if(!res.status)
   {
    if(res[0].existingGrs > 0)
    {
        this.enableGrEntry = false;
    }
    else
    {
      this.enableGrEntry = true;
    }
   }
   });
  }else
  {
    this.enableGrEntry = false;
  }
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
   {
     this.purchaseid = this.selectedRows[0].id;
     this.verifyGoodsEntryExist(this.purchaseid, this.selectedRows);
   }
 }


}
