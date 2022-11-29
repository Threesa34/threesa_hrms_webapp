import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MastersService } from '../../../services/masters.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-attendance-report',
  templateUrl: './attendance-report.component.html',
  styleUrls: ['./attendance-report.component.scss']
})
export class AttendanceReportComponent implements OnInit {

  selectedMonth:String;
  attendanceReport:any = {};
  yearsRange:any;
  _month:String;
  _year:any;
  no_days:any;

  constructor(private _MastersService : MastersService,) { }

  monthNames:object = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  ngOnInit(): void {
    const d = new Date();
    this.selectedMonth = this.monthNames[d.getMonth()]+'-'+d.getFullYear();

    this._month = this.monthNames[d.getMonth()];
    this._year = d.getFullYear();

    this.getYearsRange();

    this.getEmployeesAttendanceMonthlyReport(this.selectedMonth);
  }

  getYearsRange() {
    const currentYear = (new Date()).getFullYear();
const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
this.yearsRange = range(currentYear, currentYear - 10, -1); 
}
getEmployeesAttendanceMonthlyReport(selectedMonth)
  {
    var loadout = {date: selectedMonth};
    
    this._MastersService.getEmployeesAttendanceMonthlyReport(loadout).subscribe((res: any) => {
      this.attendanceReport = res;
      for(var i = 0 ; i < this.attendanceReport.length; i++)
      {
        this.attendanceReport[i].att_dates = this.attendanceReport[i].attendance_dates.split(',');
        this.attendanceReport[i].att_intimes = this.attendanceReport[i].attendance_intimes.split(',');
        this.attendanceReport[i].att_outtimes = this.attendanceReport[i].attendance_outtimes.split(',');
      }
     
    });
  } 

  getReportOnMonth(_month, _year)
  {
    this.selectedMonth = _month+'-'+_year;
    this.getEmployeesAttendanceMonthlyReport(this.selectedMonth);
  }

  printPage:boolean = false;

  printReportPage()
  {
   
    this.printPage = true;
    const printContent = document.getElementById("pritableDiv");
    const WindowPrt = window.open('', '', '');
    WindowPrt.document.write(printContent.innerHTML);
    WindowPrt.document.close();
    WindowPrt.focus();
    WindowPrt.print();
    WindowPrt.close();
  }
  
}
