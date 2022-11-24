import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MastersService } from '../../../services/masters.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-attendance-report',
  templateUrl: './attendance-report.component.html',
  styleUrls: ['./attendance-report.component.scss']
})
export class AttendanceReportComponent implements OnInit {


  
  attendanceList:any;
  selectedMonth:String;
  attendanceReportList:any = {};
yearsRange:any;
_month:String;
_year:any;
no_days:any;

  constructor(private _MastersService : MastersService) { }

  monthNames:object = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  ngOnInit(): void {
    const d = new Date();
    this.selectedMonth = this.monthNames[d.getMonth()]+'-'+d.getFullYear();

    this.no_days = this.daysInMonth(new Date("02 "+this.selectedMonth+""))
    this._month = this.monthNames[d.getMonth()];
    this._year = d.getFullYear();

    this.getYearsRange();
    this.getAllDaysInMonth();
  }


  monthDays:  any = [];
  getAllDaysInMonth()
  {
    this.monthDays = [];
    for(var i = 1; i <= this.no_days; i++)
    {
      this.monthDays.push({day: i});
    }
  }

  getReportOnMonth(_month, _year)
  {
    this.selectedMonth = _month+'-'+_year;
   
    this.getAttendanceReportOfEmployees(this.selectedMonth);
  }

  daysInMonth(anyDateInMonth) {
    return new Date(anyDateInMonth.getFullYear(), 
                    anyDateInMonth.getMonth()+1, 
                    0).getDate();}

  getYearsRange() {
    const currentYear = (new Date()).getFullYear();
const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
this.yearsRange = range(currentYear, currentYear - 10, -1); 
}

formatFullName(text)
  {
    var formatedtext = '';
    formatedtext = formatedtext + text;
    if(formatedtext.trim().charAt(formatedtext.length -1) == '.')
      return formatedtext;
      else
      return formatedtext+'.';
  }

  getAttendanceReportOfEmployees(selectedMonth)
  {
    var loadout = {date: selectedMonth};
    
    this._MastersService.getAttendanceReportOfEmployees(loadout).subscribe((res: any) => {
      this.attendanceReportList = res[0];
     
      
    });
  } 

}
