import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MastersService } from '../../../services/masters.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
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
  selector: 'designantion-details',
  templateUrl: 'designantion-details.html',
})
export class designantionDetails implements OnInit{
  
  designation_details:any = {};

  constructor(private _MastersService : MastersService, @Inject(MAT_DIALOG_DATA) public data: Number) {}


  ngOnInit(): void {
    this.getStatusOptions();
    if(this.data != undefined && this.data > 0)
    {
        this.getdesignationDetails(this.data);
       
    }
  }

  statusOptions:any;

  getStatusOptions()
  {
    this.statusOptions =  this._MastersService.getStatusOptions(); 
  }

  getdesignationDetails(id)
  {
    this._MastersService.getdesignationDetails(id).subscribe((res:any)=>{
      if(!res.status)
      {
        this.designation_details = res[0];
      }
    });
    
  }

  saveDesignationDetails()
  {
    if(this.designation_details.status == undefined || this.designation_details.status == null)
      this.designation_details.status = 1;
    this._MastersService.saveDesignationDetails(this.designation_details).subscribe((res: any) => {
      var resAlert ={
        title: res.title,
        text: res.message,
        type: res.type,
      }
       Swal.fire(resAlert).then((result) => {
        if (res.status === 1) {
           this._MastersService.EmitDesignationList();
        } else {
        }
      }); 
    });
  }


}

@Component({
  selector: 'app-designation-manager',
  templateUrl: './designation-manager.component.html',
  styleUrls: ['./designation-manager.component.scss']
})
export class DesignationManagerComponent implements OnInit {

  
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
  shiftid:number;

  constructor(private _router : Router, private _MastersService : MastersService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.initializeParameters();

    if (this._MastersService.subsDesignationList==undefined) {    
      this._MastersService.subsDesignationList = this._MastersService.invokeDesignationList.subscribe((name:string) => {    
        this.getDesignationList();    
      });    
    } 
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

this.getDesignationList();
  
}

getDesignationList()
{
  this._MastersService.getDesignationList().subscribe((res:any)=>{
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
  this.shiftid = this.selectedRows[0].id;
}

openDialog(type){

  if(type == 'new')
  {
    var dialogRef = this.dialog.open(designantionDetails,{width: '50%',data:0});
  }
  if(type =='edit')
  {
    var dialogRef = this.dialog.open(designantionDetails,{width: '50%',data:this.shiftid});
  }

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
}

}
