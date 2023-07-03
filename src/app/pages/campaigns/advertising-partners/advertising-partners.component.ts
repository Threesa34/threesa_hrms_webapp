import { Component, OnInit, Inject} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MastersService } from '../../../services/masters.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import Swal from 'sweetalert2';

import { PersonDetailsComponent } from './person-details/person-details.component';
import { QrCodeComponent } from './qr-code/qr-code.component';

@Component({
  selector: 'app-advertising-partners',
  templateUrl: './advertising-partners.component.html',
  styleUrls: ['./advertising-partners.component.scss']
})
export class AdvertisingPartnersComponent implements OnInit {

  
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

   if (this._MastersService.subsPartnersList==undefined) {    
    this._MastersService.subsPartnersList = this._MastersService.invokePartnersList.subscribe((name:string) => {    
      this.getAdvertisingPartnersList();    
    });    
  } 

 }

 initializeParameters()
 {
   this.columnDefs = [
     
     {
       headerName: "Name", 
       field: 'name',
       checkboxSelection: true,
       filterParams: {
         resetButton: true,
         suppressAndOrCondition: true,
         enableCellTextSelection:true,
          ensureDomOrder:true,
       },
     },
     
     {
       headerName: "Mobile No.", 
       field: 'mobile1',
       filterParams: {
         resetButton: true,
         suppressAndOrCondition: true,
       },
     },
    {
      headerName: "Alt. Mobile No.", 
      field: 'mobile2',
      filterParams: {
        resetButton: true,
        suppressAndOrCondition: true,
      },
    },
    {
      headerName: "Unique Number For referance", 
      field: 'unique_number',
      filterParams: {
        resetButton: true,
        suppressAndOrCondition: true,
      },
    }
    
     
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
 
 this.getAdvertisingPartnersList();
   
 }

 getAdvertisingPartnersList()
 {
   this._MastersService.getAdvertisingPartnersList().subscribe((res:any)=>{
     if(!res.status)
   {
    this.selectedRows = [];
     this.rowData = res;
     this.gridApi.setDomLayout("autoHeight");
   }
   });
 }

 resetAgentsPassword()
 {
  var agentIds = [];
  this.selectedRows.forEach(function(_val){
    agentIds.push(_val.id)
  });
  if(agentIds.length == this.selectedRows.length)
  {
  this._MastersService.resetAgentsPassword(agentIds).subscribe((res: any) => {
    var resAlert ={
      title: res.title,
      text: res.message,
      type: res.type,
    }
     Swal.fire(resAlert).then((result) => {
      if (res.status === 1) {
        this.getAdvertisingPartnersList();
        this.selectedRows = [];
      } else {
      }
    }); 
  });
  }
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

 getPartnerDetails()
 {
  var dialogRef = this.dialog.open(PersonDetailsComponent,{width: '50%',data:this.selectedRows});
  dialogRef.afterClosed().subscribe(result => {
  });
 }

 addPartnerDetails()
 {
  var dialogRef = this.dialog.open(PersonDetailsComponent,{width: '50%'});
  dialogRef.afterClosed().subscribe(result => {
  });
 }

 generateQRCode()
 {
  var dialogRef = this.dialog.open(QrCodeComponent,{width: '50%', data:this.selectedRows});
  dialogRef.afterClosed().subscribe(result => {
  });
 }

}
