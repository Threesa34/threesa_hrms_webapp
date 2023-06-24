import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MastersService } from '../../../services/masters.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import Swal from 'sweetalert2';




const disableConfirm = {
  title: 'Are you sure?',
  text: 'Want to deacivate selected Users/users',
  type: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Yes, proceed!',
  cancelButtonText: 'No, keep it'
}

const deleteConfirm = {
  title: 'Are you sure?',
  text: 'Want to permanently delete selected Record(s)',
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

declare var H: any;

@Component({
  selector: 'location-details',
  templateUrl: './sub_modules/location-details.html',
  styleUrls: ['./office-locations.component.scss']
})
export class locationDetais implements OnInit{
  
  shift_assignment_details:any = {};

  constructor(private _MastersService : MastersService, @Inject(MAT_DIALOG_DATA) public data: any) {}

  locationDetails:any = {};

  ngOnInit(): void {
    if(this.data != undefined && this.data != null && this.data.length > 0)
    this.locationDetails = this.data[0];
  }

  

  saveOfficeLocationDetails()
  {
    this._MastersService.saveOfficeLocationDetails(this.locationDetails).subscribe((res: any) => {
      var resAlert ={
        title: res.title,
        text: res.message,
        type: res.type,
      }
       Swal.fire(resAlert).then((result) => {
        if (res.status === 1) {
          this._MastersService.EmitOfficeLocationList();
        } else {
        }
      }); 
    });
  } 


  getGeoCodesFromAddress()
  {
    if(this.locationDetails != undefined && this.locationDetails != null && (this.locationDetails.address != undefined && this.locationDetails.address != null))
    {

      var formData = new FormData()

      formData.append('c1', this.locationDetails.address);
      formData.append('action', 'gpcm');
      formData.append('cp', '');
       

      this._MastersService.getGeoCodesFromAddress(formData).subscribe((res: any) => {
        console.log(res)
      });
    }
  }


}

@Component({
  selector: 'app-office-locations',
  templateUrl: './office-locations.component.html',
  styleUrls: ['./office-locations.component.scss']
})
export class OfficeLocationsComponent implements OnInit {

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
  locationId:number;

  constructor(private _router : Router, private _MastersService : MastersService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.initializeParameters();
    if (this._MastersService.subsOfficeLocationList==undefined) {    
      this._MastersService.subsOfficeLocationList = this._MastersService.invokeOfficeLocationList.subscribe((name:string) => {    
        this.getOfficeLocationsList();    
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
        headerName: "Lattitude", 
        field: 'lat',
        filterParams: {
          resetButton: true,
          suppressAndOrCondition: true,
        },
      },
      {
        headerName: "Longitude", 
        field: 'lang',
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
  
  this.getOfficeLocationsList();
    
  }
 
  getOfficeLocationsList()
  {
    this._MastersService.getOfficeLocationsList().subscribe((res:any)=>{
      if(!res.status)
    {
      this.rowData = res;
      this.selectedRows = [];
      this.gridApi.setDomLayout("autoHeight");
    }
    });
  }

  openDialog(){  
    var dialogRef = this.dialog.open(locationDetais,{width: '50%',data:this.selectedRows});
    dialogRef.afterClosed().subscribe(result => {
    });
  }
 
  onSelectionChanged(event) {
    this.selectedRows = this.gridApi.getSelectedRows();
  }

  
  deleteOfficeLocations()
 {
   var locationIds = '';
   this.selectedRows.map(function(value)
   {
     locationIds = locationIds+value.id+',';
   });

   locationIds = locationIds.substr(0, locationIds.length - 1);
   
   Swal.fire(deleteConfirm).then((result) => {
     if (result.value) {
   this._MastersService.deleteOfficeLocations({locationIds:locationIds}).subscribe((res: any) => {
     alertPopup.text = res.message;
     alertPopup.title = res.title;
     alertPopup.type = res.type;

     Swal.fire(alertPopup).then((result) => {
       if (res.status === 0) {
 
       } else {
         this.getOfficeLocationsList()
       }
     });
   });
 } else if (result.dismiss === Swal.DismissReason.cancel) {
   Swal.fire(
     'Cancelled',
     'Your record is safe :)',
     'error'
   )
 }
 });
 
 }


}
