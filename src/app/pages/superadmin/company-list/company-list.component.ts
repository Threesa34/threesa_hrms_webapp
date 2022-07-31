import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MastersService } from '../../../services/masters.service';
import Swal from 'sweetalert2';

const deleteConfirm = {
  title: 'Are you sure?',
  text: 'Want to deacivate selected company/companies',
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
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {

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
   companyid:number;

  constructor(private _router : Router, private _MastersService : MastersService) { }

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
        headerName: "Website", 
        field: 'website',
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
  
  this.getCompanyList();
    
  }

  getCompanyList()
  {
    this._MastersService.getCompaniesList().subscribe((res:any)=>{
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
    this.companyid = this.selectedRows[0].id;
  }

  deleteCompanies()
  {
    var companyids = '';
    this.selectedRows.map(function(value)
    {
      companyids = companyids+value.id+',';
    });

    companyids = companyids.substr(0, companyids.length - 1);
    
    Swal.fire(deleteConfirm).then((result) => {
      if (result.value) {
    this._MastersService.deleteCompanies({companyIds:companyids}).subscribe((res: any) => {
      alertPopup.text = res.message;
      alertPopup.title = res.title;
      alertPopup.type = res.type;

      Swal.fire(alertPopup).then((result) => {
        if (res.status === 0) {
  
        } else {
          this.getCompanyList()
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
  
  }
}
