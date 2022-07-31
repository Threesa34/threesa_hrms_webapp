import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SiteadminService } from '../../../services/siteadmin.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import {  FileUploader } from 'ng2-file-upload';
import * as XLSX from 'xlsx';
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
  selector: 'products-details',
  templateUrl: 'products-details.html',
})
export class ProductDetails implements OnInit {
  
  Product_details:any = {};
  StatusOptions:any = [
    {id:1, title:'Active'},
    {id:0, title:'Deactive'},
    ];
  constructor(private _SiteadminService : SiteadminService, @Inject(MAT_DIALOG_DATA) public data: Number) {}


  ngOnInit(): void {

    this.getManufacturelsList();
    this.getCatagoriesList();
    if(this.data != undefined && this.data > 0)
    {
        this.getProductDetails(this.data);
    }
  }

  manufacturelsList:any;
  getManufacturelsList()
{
  this._SiteadminService.getManufacturelsList().subscribe((res:any)=>{
    if(!res.status)
  {
    this.manufacturelsList = res;
  }
  });
}

catagoryiesList:any;
getCatagoriesList()
{
  this._SiteadminService.getCatagoriesList().subscribe((res:any)=>{
    if(!res.status)
  {
    this.catagoryiesList = res;
  }
  });
}

  getProductDetails(id)
  {
    this._SiteadminService.getProductDetails(id).subscribe((res:any)=>{
      if(!res.status)
      {
        this.Product_details = res[0];
      }
    });
    
  }

  saveProductDetails()
  {
    if(this.Product_details.status == undefined || this.Product_details.status == null)
    {
      this.Product_details.status = 1;
    }
    this._SiteadminService.saveProductDetails(this.Product_details).subscribe((res: any) => {
      var resAlert ={
        title: res.title,
        text: res.message,
        type: res.type,
      }
       Swal.fire(resAlert).then((result) => {
        if (res.status === 1) {
           this._SiteadminService.EmitProductsList();
        } else {
        }
      }); 
    });
  }

}



@Component({
  selector: 'upload-products-details',
  templateUrl: 'upload-products.html',
})
export class UploadProductsDetails implements OnInit{
  

  constructor(private _SiteadminService : SiteadminService){}

  sheets:any;
  uploadData :any = {};
  
  public uploader: FileUploader = new FileUploader({
    isHTML5: true
  });

  ngOnInit(): void {}

  onFileChange(ev) {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
       
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
    this.sheets = Object.keys(jsonData);
    this.uploadData.seletedSheet = this.sheets[0];
    }
    reader.readAsBinaryString(file);
  }

  UploadExcelData()
  {
    let data = new FormData();
    if (this.uploader.queue.length > 0) {
      this.uploader.queue.map((value, index)=>{
        data.append('file'+index, value._file);
      });
    }
    data.append('sheetname', this.uploadData.seletedSheet);
    this._SiteadminService.UploadProductsData(data).subscribe((res: any) => {
      var resAlert ={
       title: res.title,
       text: res.message,
       type: res.type,
     }
      Swal.fire(resAlert).then((result) => {
       if (res.status === 1) {
        this._SiteadminService.EmitProductsList();
       } else {
       }
     }); 
   });
  }

}

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  
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
  productid:number = 0;

 constructor(private _router : Router, private _SiteadminService : SiteadminService, public dialog: MatDialog) { }


  ngOnInit(): void {
    this.initializeParameters();


    if (this._SiteadminService.subsProductsList==undefined) {    
      this._SiteadminService.subsProductsList = this._SiteadminService.invokeProductsList.subscribe((name:string) => {    
        this.getProductsList();    
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
       headerName: "Category", 
       field: 'category',
       type: 'text',
       filterParams: {
         resetButton: true,
         suppressAndOrCondition: true,
       },
     },
     {
       headerName: "Manufacturel", 
       field: 'manufacturel',
       type: 'text',
       filterParams: {
         resetButton: true,
         suppressAndOrCondition: true,
       },
     },
     {
       headerName: "Status", 
       field: '_status',
       type: 'text',
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

this.getProductsList();
  
}

getProductsList()
{
  this._SiteadminService.getProductsList().subscribe((res:any)=>{
    if(!res.status)
  {
    this.rowData = res;
    this.gridApi.setDomLayout("autoHeight");
    this.selectedRows = [];
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
  this.productid = this.selectedRows[0].id;
}

openDialog(type){

  if(type == 'new')
  {
    var dialogRef = this.dialog.open(ProductDetails,{width: '75%',data:0});
  }
  if(type =='edit')
  {
    var dialogRef = this.dialog.open(ProductDetails,{width: '75%',data:this.productid});
  }

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
}

openUploadDialog(){

  var dialogRef = this.dialog.open(UploadProductsDetails,{data:0});

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
}


}
