import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MastersService } from '../../../services/masters.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
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

export class MyErrorStateMatcher implements ErrorStateMatcher {

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'loan-reciept-details',
  templateUrl: 'loan-reciept-details.html'
})
export class loanRecieptDetails implements OnInit{
  
  loanRecieptDetails:any = {};
  loanDetails:any = {};
  userRole:any;
 
  constructor(public _MastersService : MastersService, public cookieService: CookieService, @Inject(MAT_DIALOG_DATA) public data: Number) {}

  ngOnInit(): void {
    this.userRole = localStorage.getItem('role');
    if(this.data != undefined && this.data > 0)
    {
        this.getloanRecieptDetails(this.data)
    }
    this.getStatusOptions();
    this.getLoanApplications();
  }

  statusOptions:any;

  getStatusOptions()
  {
    this.statusOptions =  this._MastersService.getStatusOptions(); 
  }

  
  getloanRecieptDetails(id)
  {
    this._MastersService.getloanRecieptDetails(id).subscribe((res:any)=>{
      if(!res.status)
      {
        this.loanRecieptDetails = res[0];
      }
    });
    
  }
  loanApplicationsList:any;
  getLoanApplications()
  {
    this._MastersService.getLoanApplications().subscribe((res:any)=>{
      if(!res.status)
      {
        this.loanApplicationsList = res;
      }
    });
    
  }

  getLoanApplicationDetails(loanid)
  {
var filteredValue = this.loanApplicationsList.filter((values)=>{
      return values.id == loanid;
    });
    if(filteredValue != undefined && filteredValue.length > 0)
    {
      this.loanDetails.approval_amt = filteredValue[0].approval_amt
      this.loanDetails.tenure = filteredValue[0].tenure
      this.loanDetails.interest_rate = filteredValue[0].interest_rate
      this.loanDetails.emi = filteredValue[0].emi
      this.loanRecieptDetails.emi = filteredValue[0].emi
      this.loanRecieptDetails.employee_id = filteredValue[0].employee_id
    }   
  }

  emiFormControl = new FormControl('', [
    Validators.required,
  ]);

  

  
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
    
    if(this.loanDetails.approval_amt != undefined && this.loanDetails.approval_amt > 0)
    {
      if(this.loanDetails.interest_rate > 0)
      {

        this.loanDetails.emi = this.Pmt(this.loanDetails.interest_rate,this.loanDetails.tenure,(-1*this.loanDetails.approval_amt),0);
       
       return  math.round(this.loanDetails.emi) * parseFloat(this.loanDetails.tenure)
      }
      
      else
          return this.loanDetails.approval_amt;
    }
  }
  matcher = new MyErrorStateMatcher();
  _errorInEmi:boolean;
  getTotalPaidEmiAmount()
  {
    this._MastersService.getTotalPaidEmiAmount(this.loanRecieptDetails).subscribe((res: any) => {
      
      {
      if(parseFloat(res[0].total_paid_emi) + parseFloat(this.loanRecieptDetails.emi) > this.calculateEmi())
      {
        this._errorInEmi = true;

        var resAlert ={
          title: "Error",
          text: "EMI amount is greater than loan amount.",
          type: 'error',
        }
         Swal.fire(resAlert).then((result) => {
          
        }); 
        
      }
      else
      this._errorInEmi = false;
        
      }
    });
  }

   saveLoanReciet()
  {
    if(this.loanRecieptDetails.status == undefined || this.loanRecieptDetails.status == null)
    this.loanRecieptDetails.status = 1;
    this._MastersService.saveLoanReciet(this.loanRecieptDetails).subscribe((res: any) => {
      var resAlert ={
        title: res.title,
        text: res.message,
        type: res.type,
      }
       Swal.fire(resAlert).then((result) => {
        if (res.status === 1) {
          this._MastersService.EmitloanRecieptList();
        } else {
        }
      }); 
    });
  } 

  


}




@Component({
  selector: 'app-loan-payment',
  templateUrl: './loan-payment.component.html',
  styleUrls: ['./loan-payment.component.scss']
})
export class LoanPaymentComponent implements OnInit {

 
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

    if (this._MastersService.subsloanRecieptList==undefined) {    
      this._MastersService.subsloanRecieptList = this._MastersService.invokeloanRecieptList.subscribe((name:string) => {    
        this.getloanRecieptList();    
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
       headerName: "Loan Appilcation ID", 
       field: 'loan_id',
       filterParams: {
         resetButton: true,
         suppressAndOrCondition: true,
       },
     },
     {
       headerName: "Paid EMI", 
       field: 'paid_emi',
       filterParams: {
         resetButton: true,
         suppressAndOrCondition: true,
       },
     },
     {
       headerName: "Reciept Date", 
       field: 'paid_date',
       filterParams: {
         resetButton: true,
         suppressAndOrCondition: true,
       },
     },
     {
       headerName: "Recieved By", 
       field: 'recieved_by',
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

this.getloanRecieptList();
  
}

getloanRecieptList()
{
  this._MastersService.getloanRecieptList().subscribe((res:any)=>{
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
    var dialogRef = this.dialog.open(loanRecieptDetails,{disableClose: true, width: '50%',data:0});
  }
  if(type =='edit')
  {
    var dialogRef = this.dialog.open(loanRecieptDetails,{disableClose: true, width: '50%',data:this.leaveid});
  }

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
}


}
