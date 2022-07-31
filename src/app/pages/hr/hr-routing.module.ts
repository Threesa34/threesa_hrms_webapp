import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { AttendanceListComponent } from './attendance-list/attendance-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ShiftManagementComponent } from './shift-management/shift-management.component';
import { SalaryManagementComponent } from './salary-management/salary-management.component';
import { SalaryProcessComponent } from './salary-process/salary-process.component';
import { LoanRequestComponent } from './loan-request/loan-request.component';
import { LoanPaymentComponent } from './loan-payment/loan-payment.component';
import { LeaveManagementComponent } from './leave-management/leave-management.component';
import { AttendanceReportComponent } from './attendance-report/attendance-report.component';
import { DesignationManagerComponent } from './designation-manager/designation-manager.component';

function getSalaryMonth()
{
  var salaryMonth = '';
  var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const d = new Date();
    salaryMonth = monthNames[d.getMonth()]+'-'+d.getFullYear();

  return salaryMonth;
}


const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Hr',
      status: true
    },
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
        
      }, 
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: {
          breadcrumb: 'Dashboard',
          status: true
        },
      }, 
      {
        path: 'designation',
        component: DesignationManagerComponent,
        data: {
          breadcrumb: 'Designations',
          status: true,
          icon:'workspace_premium'
        },
      }, 
      {
        path: 'employee',
        component: EmployeeListComponent,
        data: {
          breadcrumb: 'Employees',
          status: true,
          icon:'supervisor_account'
        },
      }, 
      {
        path: 'employee_details/:id',
        component: EmployeeDetailsComponent,
        data: {
          breadcrumb: 'Employee Details',
          status: true,
          icon:'supervisor_account'
        },
      }, 
      {
        path: 'attendance',
        component: AttendanceListComponent,
        data: {
          breadcrumb: 'Employee Attendance',
          status: true,
          icon:'alarm'
        },
      }, 
      {
        path: 'attendance_report',
        component: AttendanceReportComponent,
        data: {
          breadcrumb: 'Employee Attendance Report',
          status: true
        },
      }, 
      {
        path: 'salary_management',
        component: SalaryManagementComponent,
        data: {
          breadcrumb: 'Salary Management',
          status: true,
          icon:'account_balance_wallet'
        },
      }, 
      {
        path: 'shift_management',
        component: ShiftManagementComponent,
        data: {
          breadcrumb: 'Shift Management',
          status: true,
          icon: 'watch_later'
        },
      }, 
      {
        path: 'leaves',
        component: LeaveManagementComponent,
        data: {
          breadcrumb: 'Leaves Management',
          status: true,
          icon:'beach_access'
        },
      }, 
      {
        path: 'loan_payment',
        component: LoanRequestComponent,
        data: {
          breadcrumb: 'Loan Requests',
          status: true,
          icon:'account_balance'
        },
      }, 
      {
        path: 'loan_reciepts',
        component: LoanPaymentComponent,
        data: {
          breadcrumb: 'Loan Reciept',
          status: true,
          icon:'account_balance'
        },
      }, 
      {
        path: 'salary_process',
        component: SalaryProcessComponent,
        data: {
          breadcrumb: 'Salary Process',
          status: true,
          icon:'receipt_long'
        },
      }, 
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HrRoutingModule { }
