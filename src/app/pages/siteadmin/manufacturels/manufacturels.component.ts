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
  selector: 'manufacturel-details',
  templateUrl: 'manufacturel-details.html',
})
export class ManufacturelDetails implements OnInit{
  
  manufacturel_details:any = {};

  constructor(private _SiteadminService : SiteadminService, @Inject(MAT_DIALOG_DATA) public data: Number) {}


  ngOnInit(): void {
    if(this.data != undefined && this.data > 0)
    {
        this.getmanufacturelDetails(this.data);
    }
  }


  getmanufacturelDetails(id)
  {
    this._SiteadminService.getmanufacturelDetails(id).subscribe((res:any)=>{
      if(!res.status)
      {
        this.manufacturel_details = res[0];
      }
    });
    
  }

  saveManufacturelDetails()
  {
    this._SiteadminService.saveManufacturelDetails(this.manufacturel_details).subscribe((res: any) => {
      var resAlert ={
        title: res.title,
        text: res.message,
        type: res.type,
      }
       Swal.fire(resAlert).then((result) => {
        if (res.status === 1) {
           this._SiteadminService.EmitManufacturelsList();
        } else {
        }
      }); 
    });
  }


}

@Component({
  selector: 'upload-manufacturel-details',
  templateUrl: 'upload-manufacturals.html',
})
export class UploadManufacturelDetails implements OnInit{
  

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
    this._SiteadminService.UploadManufacturalData(data).subscribe((res: any) => {
      var resAlert ={
       title: res.title,
       text: res.message,
       type: res.type,
     }
      Swal.fire(resAlert).then((result) => {
       if (res.status === 1) {
        this._SiteadminService.EmitManufacturelsList();
       } else {
       }
     }); 
   });
  }

}


@Component({
  selector: 'app-manufacturels',
  templateUrl: './manufacturels.component.html',
  styleUrls: ['./manufacturels.component.scss']
})
export class ManufacturelsComponent implements OnInit {

 
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
  manufaturalid:number = 0;

 constructor(private _router : Router, private _SiteadminService : SiteadminService, public dialog: MatDialog) { }


  ngOnInit(): void {
    this.initializeParameters();


    if (this._SiteadminService.subsmanufacturelsList==undefined) {    
      this._SiteadminService.subsmanufacturelsList = this._SiteadminService.invokeManufacturelsList.subscribe((name:string) => {    
        this.getManufacturelsList();    
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
       headerName: "Address", 
       field: 'address',
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

this.getManufacturelsList();
  
}

getManufacturelsList()
{
  this._SiteadminService.getManufacturelsList().subscribe((res:any)=>{
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
  this.manufaturalid = this.selectedRows[0].id;
}

openDialog(type){

  if(type == 'new')
  {
    var dialogRef = this.dialog.open(ManufacturelDetails,{data:0});
  }
  if(type =='edit')
  {
    var dialogRef = this.dialog.open(ManufacturelDetails,{data:this.manufaturalid});
  }

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
}

openUploadDialog(){

  var dialogRef = this.dialog.open(UploadManufacturelDetails,{data:0});

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
}

}
