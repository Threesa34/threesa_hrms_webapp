import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MastersService } from '../../../services/masters.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import { math } from '@amcharts/amcharts4/core';
const deleteConfirm = {
  title: 'Are you sure?',
  text: 'Want to delete these details',
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
  selector: 'loan-request-details',
  templateUrl: 'loan-request-details.html'
})
export class loanRequestDetails implements OnInit{
  
  loanRequestDetails:any = {};
 userRole:any;
  approvalStatus:any = [
    {id:0,title:'Pending'},
    {id:1,title:'Approved'},
    {id:2,title:'Denied'},
  ]
  EmployeeDetails:any;
  constructor(private _MastersService : MastersService, private cookieService: CookieService, @Inject(MAT_DIALOG_DATA) public data: Number) {}

  ngOnInit(): void {
    this.userRole = localStorage.getItem('role');
    if(this.data != undefined && this.data > 0)
    {
        this.getloanRequestDetails(this.data)
    }
    this.getStatusOptions();
    this.getEmployeesList();
  }

  statusOptions:any;

  getStatusOptions()
  {
    this.statusOptions =  this._MastersService.getStatusOptions(); 
  }


  getEmployeesList()
  {
    this._MastersService.getEmployeesList().subscribe((res:any)=>{
      if(!res.status)
      {
        this.EmployeeDetails = res;
      }
    });
  }
  
  getloanRequestDetails(id)
  {
    this._MastersService.getloanRequestDetails(id).subscribe((res:any)=>{
      if(!res.status)
      {
        this.loanRequestDetails = res[0];
      }
    });
    
  }


  Pmt(r,np,pv,fv) {
    var pmt = 0;
    r = r/1200
    if (!fv) fv = 0;
    pmt=-(r * (fv+Math.pow((1+r),np)*pv)/(-1+Math.pow((1+r),np)));
    var finalPmt=this.roundOff(pmt,2);
    return finalPmt;
    }
    
   roundOff(value, dplaces){
    value=value.toString()
    
    if((value.indexOf(".")!=-1)&&(value.length>(value.indexOf(".")+dplaces))){
        var three=value.substring(value.indexOf(".")+dplaces+1,value.indexOf(".")+dplaces+2)
        var one=value.substring(0,value.indexOf(".")+dplaces)
        var two=value.substring(value.indexOf(".")+dplaces,value.indexOf(".")+dplaces+1)
        if(parseInt(three)>=5){value=one+(parseInt(two)+1);value=parseFloat(value)}
        else{value=one+two;value=parseFloat(value)}
    }
           return value;
    }
    

  calculateEmi()
  {
    
    if(this.loanRequestDetails.approval_amt != undefined && this.loanRequestDetails.approval_amt > 0)
    {
      if(this.loanRequestDetails.interest_rate > 0)
      {

        this.loanRequestDetails.emi = this.Pmt(this.loanRequestDetails.interest_rate,this.loanRequestDetails.tenure,(-1*this.loanRequestDetails.approval_amt),0);
       
      /*  var amt_inc_int = parseFloat(this.loanRequestDetails.approval_amt) + (parseFloat(this.loanRequestDetails.approval_amt) * ((parseFloat(this.loanRequestDetails.interest_rate)/1200)))
       this.loanRequestDetails.emi = (amt_inc_int) / parseFloat(this.loanRequestDetails.tenure); */
       this.loanRequestDetails.emi = math.round(this.loanRequestDetails.emi)
      }
      
      else
      this.loanRequestDetails.emi = this.loanRequestDetails.approval_amt /this.loanRequestDetails.tenure;
    }
  }

   saveLoanRequest()
  {
    if(this.loanRequestDetails.status == undefined || this.loanRequestDetails.status == null)
    this.loanRequestDetails.status = 1;
    
    this._MastersService.saveLoanRequest(this.loanRequestDetails).subscribe((res: any) => {
      var resAlert ={
        title: res.title,
        text: res.message,
        type: res.type,
      }
       Swal.fire(resAlert).then((result) => {
        if (res.status === 1) {
          this._MastersService.EmitloanRequestList();
        } else {
        }
      }); 
    });
  } 

  deleteLoanRequest()
  {
    Swal.fire(deleteConfirm).then((result) => {
      if (result.value) {
    this._MastersService.deleteLoanRequest(this.data).subscribe((res: any) => {
      alertPopup.text = res.message;
      alertPopup.title = res.title;
      alertPopup.type = res.type;
 
      Swal.fire(alertPopup).then((result) => {
        if (res.status === 0) {
  
        } else {
          this._MastersService.EmitloanRequestList();
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



@Component({
  selector: 'app-loan-request',
  templateUrl: './loan-request.component.html',
  styleUrls: ['./loan-request.component.scss']
})
export class LoanRequestComponent implements OnInit {

 
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
  leaveid:number;

  constructor(private _router : Router, private _MastersService : MastersService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.initializeParameters();

    if (this._MastersService.subsloanRequestList==undefined) {    
      this._MastersService.subsloanRequestList = this._MastersService.invokeloanRequestList.subscribe((name:string) => {    
        this.getloanRequestList();    
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
       headerName: "Requested Amount", 
       field: 'loan_amt',
       filterParams: {
         resetButton: true,
         suppressAndOrCondition: true,
       },
     },
     {
       headerName: "Tenure", 
       field: 'tenure',
       filterParams: {
         resetButton: true,
         suppressAndOrCondition: true,
       },
     },
     {
       headerName: "Interest Rate", 
       field: 'interest_rate',
       filterParams: {
         resetButton: true,
         suppressAndOrCondition: true,
       },
     },
     {
       headerName: "EMI", 
       field: 'emi',
       filterParams: {
         resetButton: true,
         suppressAndOrCondition: true,
       },
     },
     {
       headerName: "Approval Status", 
       field: 'approval',
       filterParams: {
         resetButton: true,
         suppressAndOrCondition: true,
       },
     },
     {
       headerName: "Paid Amount", 
       field: 'paid_emi',
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

this.getloanRequestList();
  
}

getloanRequestList()
{
  this._MastersService.getloanRequestList().subscribe((res:any)=>{
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
  this.leaveid = this.selectedRows[0].id;
}

openDialog(type){

  if(type == 'new')
  {
    var dialogRef = this.dialog.open(loanRequestDetails,{width: '50%',data:0});
  }
  if(type =='edit')
  {
    var dialogRef = this.dialog.open(loanRequestDetails,{width: '50%',data:this.leaveid});
  }

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
}

}
