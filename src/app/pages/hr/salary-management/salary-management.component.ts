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
  selector: 'salary-details',
  templateUrl: 'salary-details.html',
  styleUrls: ['./salary-management.component.scss']
})
export class salaryDetails implements OnInit{
  
  salary_details:any = {};

  constructor(private _MastersService : MastersService, @Inject(MAT_DIALOG_DATA) public data: Number) {}

  earnings:any = [];
  deductions:any = [];
  fixed:any = [];

  ngOnInit(): void {
    this.getStatusOptions();
    this.getEmployeesList();
    if(this.data != undefined && this.data > 0)
    {
        this.getSalaryApprisalDetails(this.data);
       
    }
  }

  EmployeeDetails:any;


  statusOptions:any;
  getEmployeesList()
  {
    this._MastersService.getEmployeesList().subscribe((res:any)=>{
      if(!res.status)
      {
        this.EmployeeDetails = res;
      }
    });
  }

  getStatusOptions()
  {
    this.statusOptions =  this._MastersService.getStatusOptions(); 
  }

  AddFixedEntry()
  {
    if(this.fixed.length > 0)
    {
     if((this.fixed[this.fixed.length -1].type != undefined && this.fixed[this.fixed.length -1].type != null && this.fixed[this.fixed.length -1].type != '') && (this.fixed[this.fixed.length -1].amount != undefined && this.fixed[this.fixed.length -1].amount != null && this.fixed[this.fixed.length -1].amount != 0))
     {
      this.fixed.push({type:'', amount:0})
     }
    }
    else{
      this.fixed.push({type:'', amount:0})
    }
  }

  AddearningEntry()
  {
    if(this.earnings.length > 0)
    {
     if((this.earnings[this.earnings.length -1].type != undefined && this.earnings[this.earnings.length -1].type != null && this.earnings[this.earnings.length -1].type != '') && (this.earnings[this.earnings.length -1].amount != undefined && this.earnings[this.earnings.length -1].amount != null && this.earnings[this.earnings.length -1].amount != 0))
     {
      this.earnings.push({type:'', amount:0})
     }
    }
    else{
      this.earnings.push({type:'', amount:0})
    }
  }

  AddDeductionEntry()
  {
    if(this.deductions.length > 0)
    {
     if((this.deductions[this.deductions.length -1].type != undefined && this.deductions[this.deductions.length -1].type != null && this.deductions[this.deductions.length -1].type != '') && (this.deductions[this.deductions.length -1].amount != undefined && this.deductions[this.deductions.length -1].amount != null && this.deductions[this.deductions.length -1].amount != 0))
     {
      this.deductions.push({type:'', amount:0})
     }
    }
    else{
      this.deductions.push({type:'', amount:0})
    }
  }

  SpliceEntry(object, index)
  {
      object.splice(index , 1);
      this.CalculateNetSalary()
  }

  CalculateNetSalary()
  {
    var totalAmount = 0;
        if(this.fixed.length > 0)
        {
          this.fixed.map((value)=>{
              totalAmount = totalAmount + parseFloat(value.amount);
          });
           
        }
        if(this.earnings.length > 0)
        {
          this.earnings.map((value)=>{
            totalAmount = totalAmount + parseFloat(value.amount);
        }); 
        }
        if(this.deductions.length > 0)
        {
          this.deductions.map((value)=>{
            totalAmount = totalAmount - parseFloat(value.amount);
        });
        }
        this.salary_details.net_salary = totalAmount;
  }

  getSalaryApprisalDetails(id)
  {
    this._MastersService.getSalaryApprisalDetails(id).subscribe((res:any)=>{
      if(!res.status)
      {
        this.salary_details = res[0];
        this.fixed = JSON.parse(this.salary_details.fixed)
        this.earnings = JSON.parse(this.salary_details.earned)
        this.deductions = JSON.parse(this.salary_details.deductions)
      }
    });
    
  }

  saveSalaryApprisalDetails()
  {
    if(this.salary_details.status == undefined || this.salary_details.status == null)
      this.salary_details.status = 1;

      this.salary_details.fixed = JSON.stringify(this.fixed);
      this.salary_details.earned = JSON.stringify(this.earnings);
      this.salary_details.deductions = JSON.stringify(this.deductions);

    this._MastersService.saveSalaryApprisalDetails(this.salary_details).subscribe((res: any) => {
      var resAlert ={
        title: res.title,
        text: res.message,
        type: res.type,
      }
       Swal.fire(resAlert).then((result) => {
        if (res.status === 1) {
           this._MastersService.EmitShiftsList();
        } else {
        }
      }); 
    });
  }


}


@Component({
  selector: 'app-salary-management',
  templateUrl: './salary-management.component.html',
  styleUrls: ['./salary-management.component.scss']
})
export class SalaryManagementComponent implements OnInit {

  
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
  salaryid:number;

  constructor(private _router : Router, private _MastersService : MastersService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.initializeParameters();

    if (this._MastersService.subsShiftsList==undefined) {    
      this._MastersService.subsShiftsList = this._MastersService.invokeShiftsList.subscribe((name:string) => {    
        this.getSalaryApprisalList();    
      });    
    } 
  }

  initializeParameters()
 {
   this.columnDefs = [
     {
       headerName: "Employee Name", 
       field: 'emp_name',
       type: 'text',
       checkboxSelection: true,
       filterParams: {
         resetButton: true,
         suppressAndOrCondition: true,
       },
     },
     {
       headerName: "Net Salary", 
       field: 'fixed_amt',
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

this.getSalaryApprisalList();
  
}

getSalaryApprisalList()
{
  this._MastersService.getSalaryApprisalList().subscribe((res:any)=>{
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
  this.salaryid = this.selectedRows[0].id;
}

openDialog(type){

  if(type == 'new')
  {
    var dialogRef = this.dialog.open(salaryDetails,{width: '50%',data:0});
  }
  if(type =='edit')
  {
    var dialogRef = this.dialog.open(salaryDetails,{width: '50%',data:this.salaryid});
  }

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
}


}
