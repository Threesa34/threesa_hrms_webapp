import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SiteadminService } from '../../../services/siteadmin.service';
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
  selector: 'stock-point-details',
  templateUrl: 'stock-point-details.html',
})
export class StockPointDetails implements OnInit{
  
  stockPointDetails:any = {};
  StatusOptions:any = [
    {id:1, title:'Active'},
    {id:0, title:'Deactive'},
    ];

  constructor(private _SiteadminService : SiteadminService, @Inject(MAT_DIALOG_DATA) public data: Number) {}


  ngOnInit(): void {
    if(this.data != undefined && this.data > 0)
    {
        this.getStockPointDetails(this.data);
    }
  }


  getStockPointDetails(id)
  {
    this._SiteadminService.getStockPointDetails(id).subscribe((res:any)=>{
      if(!res.status)
      {
        this.stockPointDetails = res[0];
      }
    });
    
  }

  saveStockPointDetails()
  {
    this._SiteadminService.saveStockPointDetails(this.stockPointDetails).subscribe((res: any) => {
      var resAlert ={
        title: res.title,
        text: res.message,
        type: res.type,
      }
       Swal.fire(resAlert).then((result) => {
        if (res.status === 1) {
           this._SiteadminService.EmitStcokPointsList();
        } else {
        }
      }); 
    });
  }


  VerifyForm()
  { 
    if((this.stockPointDetails.name != undefined && this.stockPointDetails.name != null && this.stockPointDetails.name != '') && (this.stockPointDetails.address != undefined && this.stockPointDetails.address != null && this.stockPointDetails.address != '') && (this.stockPointDetails.contact1 != undefined && this.stockPointDetails.contact1 != null && this.stockPointDetails.contact1 != 0 && (this.stockPointDetails.contact1.toString().length == 10)))
    {
      return false
    }
    return true;
  }

  DuplicateContactExist:boolean;
  VerifyDuplicateContact()
  {
    if(this.stockPointDetails.contact1 != undefined && this.stockPointDetails.contact1 != null && this.stockPointDetails.contact1 != '' && this.stockPointDetails.contact1.length == 10)
    {
      this._SiteadminService.stock_VerifyDuplicateContact(this.stockPointDetails.contact1, this.data).subscribe((res:any)=>{
        if(!res.status)
        {
           if(res[0].contactExist > 0) 
          {
            this.DuplicateContactExist = true;
            var resAlert ={
              title: 'Warning',
              text: '(Contact No.) Contact already exist database',
              type: 'error',
            }
          Swal.fire(resAlert).then((result) => {
            
            });
          }
        }
        
      });
    }
    if(this.stockPointDetails.contact2 != undefined && this.stockPointDetails.contact2 != null && this.stockPointDetails.contact2 != '' && this.stockPointDetails.contact2.length == 10)
    {
      this._SiteadminService.stock_VerifyDuplicateContact(this.stockPointDetails.contact2, this.data).subscribe((res:any)=>{
        if(!res.status)
        {
          if(res[0].contactExist > 0) 
          {
            this.DuplicateContactExist = true;
            var resAlert ={
              title: 'Warning',
              text: '(Alt. Contact No.) Contact already exist database',
              type: 'error',
            }
          Swal.fire(resAlert).then((result) => {
            
            });
          }
        }
        
      });
    }
  }

}



@Component({
  selector: 'app-stock-points',
  templateUrl: './stock-points.component.html',
  styleUrls: ['./stock-points.component.scss']
})
export class StockPointsComponent implements OnInit {

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
  stock_point_id:number;

 constructor(private _router : Router, private _SiteadminService : SiteadminService, public dialog: MatDialog) { }


  ngOnInit(): void {
    this.initializeParameters();

    if (this._SiteadminService.subsStcokPointsList==undefined) {    
      this._SiteadminService.subsStcokPointsList = this._SiteadminService.invokeStockPointList.subscribe((name:string) => {    
        this.getStockPointsList();    
        this.selectedRows = [];
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
       headerName: "Contacts", 
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
 
 this.getStockPointsList();
   
 }

 getStockPointsList()
 {
   this._SiteadminService.getStockPointsList().subscribe((res:any)=>{
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
   this.stock_point_id = this.selectedRows[0].id;
 }


 openDialog(type){

  if(type == 'new')
  {
    var dialogRef = this.dialog.open(StockPointDetails,{width: '50%',data:0});
  }
  if(type =='edit')
  {
    var dialogRef = this.dialog.open(StockPointDetails,{width: '50%',data:this.stock_point_id});
  }

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
}

}
