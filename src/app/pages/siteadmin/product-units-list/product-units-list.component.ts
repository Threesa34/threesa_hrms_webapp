import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SiteadminService } from '../../../services/siteadmin.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { HttpEvent, HttpEventType } from '@angular/common/http';
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
  selector: 'upload-product-units-details',
  templateUrl: 'upload-product_units.html',
})
export class UploadProductUnitsDetails implements OnInit{
  

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
    this._SiteadminService.UploadProductUnitsData(data).subscribe((res: any) => {
      var resAlert ={
       title: res.title,
       text: res.message,
       type: res.type,
     }
      Swal.fire(resAlert).then((result) => {
       if (res.status === 1) {
        this._SiteadminService.EmitProductUnitsList();
       } else {
       }
     }); 
   });
  }

}


@Component({
  selector: 'upload-product-units-images',
  templateUrl: 'upload-product-unit-images.html',
})
export class UploadProductUnitsImages implements OnInit{
  
  @ViewChild("fileInput", {static: false}) fileInput: ElementRef;

  constructor(private _SiteadminService : SiteadminService, private dialogRef:MatDialogRef<UploadProductUnitsImages>){}

  sheets:any;
  uploadData :any = {};
  
  public uploader: FileUploader = new FileUploader({
    isHTML5: true
  });

  ngOnInit(): void {}

  OpenFileSelector()
  {
    const fileInput = this.fileInput.nativeElement;
    fileInput.click();  
  }

  RemoveImage(item)
  {
    this.uploader.queue.splice(this.uploader.queue.indexOf(item),1);
  }

  progress: number = 0;
  UploadImages()
  {
    let data = new FormData();
    if (this.uploader.queue.length > 0) {
      this.uploader.queue.map((value, index)=>{
        data.append('file'+index, value._file);
      });
      

      this._SiteadminService.uploadProductUnitsImages(data).subscribe((event: HttpEvent<any>) => {
       
        switch (event.type) {
          case HttpEventType.Sent:
            console.log('Request has been made!');
            break;
          case HttpEventType.ResponseHeader:
            console.log('Response header has been received!');
            break;
          case HttpEventType.UploadProgress:
            this.progress = Math.round((event.loaded)  / event.total * 100);
            setTimeout(() => {
              var resAlert ={
                title: "Done!",
                text: "Images uploaded successfully",
                type: "success",
              }
               Swal.fire(resAlert).then((result) => {
                this.dialogRef.close();
              }); 
            }, 2500);
            break;
          case HttpEventType.Response:
            console.log('User successfully created!', event.body);
            setTimeout(() => {
              this.progress = 0;
            }, this.uploader.queue.length * 10000);
  
        }
        
     });

    }
  }



}

@Component({
  selector: 'app-product-units-list',
  templateUrl: './product-units-list.component.html',
  styleUrls: ['./product-units-list.component.scss']
})
export class ProductUnitsListComponent implements OnInit {

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
  prd_unit_id:number;

 constructor(private _router : Router, private _SiteadminService : SiteadminService,  public dialog: MatDialog) { }


  ngOnInit(): void {
    this.initializeParameters();

    if (this._SiteadminService.subsProductUnitsList==undefined) {    
      this._SiteadminService.subsProductUnitsList = this._SiteadminService.invokeProductUnitsList.subscribe((name:string) => {    
        this.getProductUnitsList();    
      });    
    }  

  }

  
 initializeParameters()
 {
   this.columnDefs = [
     {
       headerName: "Product Name", 
       field: 'product_name',
       type: 'text',
       checkboxSelection: true,
       filterParams: {
         resetButton: true,
         suppressAndOrCondition: true,
       },
     },
     {
       headerName: "Unit", 
       field: 'product_unit',
       filterParams: {
         resetButton: true,
         suppressAndOrCondition: true,
       },
     },
     {
       headerName: "MRP", 
       field: 'mrp',
       filterParams: {
         resetButton: true,
         suppressAndOrCondition: true,
       },
     },

     {
       headerName: "Selling Price", 
       field: 'sell_price',
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
 
 this.getProductUnitsList();
   
 }

 getProductUnitsList()
 {
   this._SiteadminService.getProductUnitsList().subscribe((res:any)=>{
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
   this.prd_unit_id = this.selectedRows[0].id;
 }

 openUploadDialog(){

  var dialogRef = this.dialog.open(UploadProductUnitsDetails,{data:0});

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
}

openUploadImagesDialog(){

  var dialogRef = this.dialog.open(UploadProductUnitsImages,{data:0});

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
}

}
