import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { FileUploadModule } from 'ng2-file-upload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModules } from '../../shared/material-modules';
import { HrRoutingModule } from './hr-routing.module';
import { EmployeeListComponent, shiftAssignment, attendanceReport, apprisalHistory, setAttendance, salarySlipHistory, leaveHistory, loanHistory, employeeReview } from './employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { AttendanceListComponent } from './attendance-list/attendance-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ShiftManagementComponent, shiftDetails } from './shift-management/shift-management.component';
import { SalaryManagementComponent,salaryDetails } from './salary-management/salary-management.component';
import { SalaryProcessComponent } from './salary-process/salary-process.component';
import { LoanRequestComponent, loanRequestDetails } from './loan-request/loan-request.component';
import { LoanPaymentComponent, loanRecieptDetails } from './loan-payment/loan-payment.component';
import { LeaveManagementComponent, leavesDetails } from './leave-management/leave-management.component';
import { AttendanceReportComponent } from './attendance-report/attendance-report.component';




import { PdfViewerModule } from 'ng2-pdf-viewer';
import {NgxPrintModule} from 'ngx-print';
import { DesignationManagerComponent, designantionDetails } from './designation-manager/designation-manager.component';
@NgModule({
  declarations: [EmployeeListComponent, shiftAssignment, attendanceReport, apprisalHistory, setAttendance, salarySlipHistory, loanHistory, employeeReview, EmployeeDetailsComponent, AttendanceListComponent, DashboardComponent, ShiftManagementComponent, shiftDetails, SalaryManagementComponent, leaveHistory, salaryDetails, SalaryProcessComponent, LoanRequestComponent, loanRequestDetails, LoanPaymentComponent, loanRecieptDetails, LeaveManagementComponent, leavesDetails, AttendanceReportComponent, DesignationManagerComponent, designantionDetails],
  imports: [
    CommonModule,
    HrRoutingModule,
    FileUploadModule,
    NgxPrintModule,
    AgGridModule.withComponents([]),
    MaterialModules,
    FormsModule,
    ReactiveFormsModule,
    PdfViewerModule,
    
  ]
})
export class HrModule { }
