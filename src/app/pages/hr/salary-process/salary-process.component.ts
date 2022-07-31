import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MastersService } from '../../../services/masters.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import Swal from 'sweetalert2';

import * as converter from 'number-to-words';


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
  selector: 'app-salary-process',
  templateUrl: './salary-process.component.html',
  styleUrls: ['./salary-process.component.scss']
})
export class SalaryProcessComponent implements OnInit {

  EmployeeDetails:any;
  salary_details:any = {};
  constructor(private _router : Router, private _MastersService : MastersService, public dialog: MatDialog) { }

monthNames:object = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
_month:String;
_year:any;
_date:any;
selectedMonth:any;
attendancedetails:any;
salaryDetails:any;
companyDetails:any;
existing_salary_id:number;

  ngOnInit(): void {

    const d = new Date();
    this.salary_details.salaryMonth = d;
    this.selectedMonth = this.monthNames[d.getMonth()]+'-'+d.getFullYear();
    this._month = this.monthNames[d.getMonth()];
    this._year = d.getFullYear();
    this._date = d.getDate();

    this.getEmployeesList();
    this.getCompanyDetails();
    
  }

  getCompanyDetails()
  {
    this._MastersService.getCompanyDetails(0).subscribe((res:any)=>{

      {
        this.companyDetails = res;
      }
    });
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

   daysInMonth (month, year) { 
    return new Date(year, month, 0).getDate(); 
}


  CalculateTotal(totalfixedEarn, expences)
  {
    return Number(totalfixedEarn) + expences;
  }

 
  totalEarnedComponent:any;
  totalFixedComponent:any;
  grossSalary:any;

  total_deduction:any;

  calculateDeduction()
  {
    this.total_deduction = 0;

    for(var i = 0; i < this.deductions.length;i++)
    {
      if(this.deductions[i].amount == undefined || this.deductions[i].amount == null || isNaN(this.deductions[i].amount))
      this.deductions[i].amount = 0;

      this.total_deduction = this.total_deduction + this.deductions[i].amount;
    }
  }

  addCustomeDeduction()
  {
    this.deductions.push({custome:1});
  }

  removeDeduction(index)
  {
    this.deductions.splice(index, 1);
    this.calculateDeduction();
  }

  getAmountInNumber(amount)
  {
    if(amount && !isNaN(amount))
      return converter.toWords(amount);
  }

  getExpenceTotal(_object)
  {
    if(_object != undefined && _object != null && _object.length > 0)
    {
      var total = 0;
       _object.map(function(val){
          total = total + val.amount;
      });
      return total;
    }
    else
    return 0;
    }



  getTotal(_object)
  {
    var total = 0;
    if(_object != undefined && _object != null && _object.length > 0)
    {
      
       _object.map(function(val){
          total = total + val.amount;
      });


      var perDaySalary =  Number(total)/Number(this.attendancedetails.no_days);

      if(this.existing_salary_id != undefined && this.existing_salary_id > 0)
      {
       
        this.totalEarnedComponent =  this.salaryDetails.finalfixedearns;
      }
      else
      {


      //this.totalEarnedComponent = (perDaySalary * Number(this.attendancedetails.prest_days_count + this.attendancedetails.latemarks_count)) + (perDaySalary * Number(this.attendancedetails.half_days_count/2));

      this.totalEarnedComponent = (perDaySalary * Number(this.attendancedetails.total_present_days_count)) + (perDaySalary * Number(this.attendancedetails.half_days_count/2));

      this.totalEarnedComponent = Math.round(this.totalEarnedComponent);
      }

      this.totalFixedComponent = total;
      
    }
    this.totalFixedComponent = total;
  }

  claculateGrossAmount(totalfixedEarn)
  {
    this.grossSalary = totalfixedEarn  + this.getExpenceTotal(this.expances_earning);
  }


  loanReciepts:any;

  getloanRecieptdDetails(employee_id, selectedmonth)
  {
    var loadout = {employee_id: employee_id, date: selectedmonth};
    this._MastersService.getloanRecieptdDetails(loadout).subscribe((res: any) => {
      this.loanReciepts = res;
      if(this.loanReciepts.length > 0)
      {
        for(var i = 0 ; i < this.loanReciepts.length;i++)
        {
          var value = this.loanReciepts[i];

          if(this.deductions.length > 0)
          {
             var existingloanid =  this.deductions.filter(function(val)
             {
                return val.loan_id && val.loan_id == value.loan_id
             });
             if(existingloanid == undefined || existingloanid.length <= 0)
             {
              var html = '<div class="row"><div class="col-12"><b>Loan A/C: '+value.loan_id+'</b></div><div class="col-12"><b>Amount: '+value.emi+'</b></div></div>'
              var confirmAction = {title: 'Do you have to add this entry?',html: html,type: 'warning',showCancelButton: true,confirmButtonText: 'Yes, proceed!',cancelButtonText: 'No, keep it'}

              Swal.fire(confirmAction).then((result) => {
                if (result.value) 
                   this.deductions.push({loan_id:value.loan_id,type:'Loan A/C: '+value.loan_id, amount: value.emi});
                   this.calculateDeduction();
              });
             }
          }
        };
       
      }
      
    });
    this.calculateDeduction();  
  }

  fixed_earning:any = [];
  expances_earning:any = [];
  deductions:any = [];


  getAttendanceReport(employee_id, salary_month)
  {
    if(salary_month == undefined || salary_month == null || salary_month =='')
    {
       var selectedmonth = this.selectedMonth;
    }
    else
    {
      const d = new Date(salary_month);
      this.selectedMonth = this.monthNames[d.getMonth()]+'-'+d.getFullYear();
      var selectedmonth = this.selectedMonth;
    }
    var loadout = {employee_id: employee_id, date: selectedmonth};

    this._MastersService.getAttendanceReport(loadout).subscribe((res: any) => {
      this.attendancedetails = res[0];
      
      if(typeof this.salary_details.salaryMonth == 'string')
      {
        var year = this.salary_details.salaryMonth.substring(0,4)
        var month = this.salary_details.salaryMonth.substring(5,7)
        this.attendancedetails.no_days = this.daysInMonth(month,year)
        this.getTotal(this.fixed_earning)
      }
      else
      {
       
        this.attendancedetails.no_days = this.daysInMonth(this.salary_details.salaryMonth.getMonth()+1, this.salary_details.salaryMonth.getFullYear());
        this.getTotal(this.fixed_earning)
      }

      if(this.salaryDetails.working_days != undefined && this.salaryDetails.working_days != null)
      {
        this.attendancedetails.total_present_days_count = this.salaryDetails.working_days; 
      }
      else{
        this.attendancedetails.total_present_days_count = this.attendancedetails.prest_days_count + this.attendancedetails.latemarks_count
      }
      if(this.salaryDetails.working_half_days != undefined && this.salaryDetails.working_half_days != null)
      this.attendancedetails.half_days_count = this.salaryDetails.working_half_days;

      this.grossSalary = this.CalculateTotal(this.totalEarnedComponent,this.getExpenceTotal(this.expances_earning))
    });
    this.getloanRecieptdDetails(employee_id, selectedmonth);
  } 

  getRoundedAmount(amount)
  {
    return Math.round(amount).toFixed(2)
  }
  getEmployeeSalaryData(employee_id, salary_month)
  {
    this.deductions = [];
    var loadout = {employee_id: employee_id};
    this._MastersService.getEmployeeSalaryDetails(loadout).subscribe((res: any) => {
      this.salaryDetails = res[0];
      if(this.salaryDetails != undefined && typeof this.salaryDetails == 'object')
      {
      this.fixed_earning = JSON.parse(this.salaryDetails.fixed);
      this.expances_earning = JSON.parse(this.salaryDetails.earned);
      this.deductions = JSON.parse(this.salaryDetails.deductions); 
      }
      this.getAttendanceReport(employee_id, salary_month);
    });
  }

  getEmployeeSalaryDetails(employee_id, salary_month)
  {

    this.deductions = [];
    this.existing_salary_id = 0;

    if(salary_month == undefined || salary_month == null || salary_month =='')
    {
       var selectedmonth = this.selectedMonth;
    }
    else
    {
      const d = new Date(salary_month);
      this.selectedMonth = this.monthNames[d.getMonth()]+'-'+d.getFullYear();
      var selectedmonth = this.selectedMonth;
    }

    var loadout = {employee_id: employee_id, salary_month:selectedmonth};

    this._MastersService.checkSalaryProceedStatus(loadout).subscribe((res: any) => {
      if(res && res.length > 0)
      {
        this.salaryDetails = res[0];
          if(this.salaryDetails != undefined && typeof this.salaryDetails == 'object')
          {

            this.existing_salary_id = this.salaryDetails.id;
          this.fixed_earning = JSON.parse(this.salaryDetails.fixed);
          this.expances_earning = JSON.parse(this.salaryDetails.earned);
          this.deductions = JSON.parse(this.salaryDetails.deductions);  
          }

          this.getAttendanceReport(employee_id, salary_month);
      }
      else
      this.getEmployeeSalaryData(employee_id, salary_month);
    });
  } 


  checkTotalMatch()
  {
     if(this.totalEarnedComponent > this.totalFixedComponent)
     {
      var resAlert ={
        title: 'Error',
        text: 'Total earned component is greater than fixed component, it should be' + this.totalFixedComponent.toFixed(2)+' or less than '+ this.totalFixedComponent.toFixed(2),
        type: 'error',
      }
       Swal.fire(resAlert).then((result) => {
        this.getTotal(this.fixed_earning);
        this.claculateGrossAmount(this.totalEarnedComponent)
      }); 
     }
  }

  saveSalarySlip()
  {

    var divContents = document.getElementById("print").innerHTML; 

    var html = '<html><head><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"><style>table.borderless tr,table.borderless td,table.borderless th{border: none;}thead, tbody, tr, th, td{padding:5px !important;font-size:10px!important}.company-heading{font-size: 20px;font-weight: bold;}</style></head><body>'+divContents+'</body></html>'
  

    var working_days = this.attendancedetails.total_present_days_count;
    
    var working_half_days = this.attendancedetails.half_days_count;

    var payload = {html:html,fixed: JSON.stringify(this.fixed_earning), earned: JSON.stringify(this.expances_earning), deductions: JSON.stringify(this.deductions), net_salary: this.grossSalary - this.total_deduction, salary_month:new Date(this.salary_details.salaryMonth+'-01'), employee_id:this.salary_details.employee_id, finalfixedearns: this.totalEarnedComponent, emp_name:this.attendancedetails.name, salary_file_month:this.selectedMonth , working_days: working_days, working_half_days: working_half_days}

    if(this.existing_salary_id && this.existing_salary_id > 0)
    {
      payload['salary_slip_id'] = this.existing_salary_id;
    }

    this._MastersService.saveSalarySlip(payload).subscribe((res: any) => {
      var resAlert ={
        title: res.title,
        text: res.message,
        type: res.type,
      }
       Swal.fire(resAlert).then((result) => {
        if (res.status === 1) {
           location.reload();
        } else {
        }
      }); 
    });

  }


  
  printSalarySlip()
  {
    var divContents = document.getElementById("print").innerHTML; 

    var html = '<html><head><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"><style>table.borderless tr,table.borderless td,table.borderless th{border: none;}.company-heading{font-size: 28px;font-weight: bold;}</style></head><body>'+divContents+'</body></html>'
    
    var payload = {html:html, empid:this.salary_details.employee_id,emp_name:this.attendancedetails.name,salary_month:this.selectedMonth}

    this._MastersService.saveSalarySlipInPDF(payload).subscribe((res: any) => {
      if(res.filename != undefined)
      {
        window.open('http://103.252.7.5:8895'+res.filename, '_blank', 'top=0,left=0,height=100%,width=auto');
      }
    });

  }
  
  openPdf()
  {

    if(this.attendancedetails != undefined && this.salary_details != undefined)
    {
      var filename = 'salarySlip_'+this.attendancedetails.name+'-'+this.selectedMonth+'.pdf';
      filename = filename.replace(/ /g,"_");

      window.open('http://103.252.7.5:8895/salarySlips/'+filename, '_blank');
    }
  }

}
