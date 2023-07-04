import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MastersService } from '../../../services/masters.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  currentDate = new Date();
  month: any | undefined;
  year: any | undefined;
  selectedMonth: any | undefined;
  selectedYear: any | undefined;
  _yearsList = [];

  constructor(private _router : Router, private _MastersService : MastersService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAgentProfile();
    this.getAgentTotalConnectionsCount();
    this.month = this.currentDate.getMonth();
    if(this.month < 10)
    {
      this.month = '0'+this.month ;
    }
    this.selectedMonth = this.currentDate.getFullYear()+"-"+this.month;
    this.selectedYear = this.currentDate.getFullYear();

    for(var i = 10 ; i > 0;i--)
    {
      this._yearsList.push(this.currentDate.getFullYear() - i)
    }
    this._yearsList.push(this.currentDate.getFullYear())

    this.getAgentsEnquiriesAndConnections(this.selectedMonth);
  }


agentProfile: any = [];
  getAgentProfile()
  {
    this._MastersService.getAgentProfile().subscribe((res:any)=>{
      if(!res.status)
    {
      this.agentProfile = res;
    }
    });
  }

  agentConnectionsCount: any = [];
  getAgentTotalConnectionsCount()
  {
    this._MastersService.getAgentTotalConnectionsCount().subscribe((res:any)=>{
      if(!res.status)
    {
      this.agentConnectionsCount = res;
    }
    });
  }

  getSelectedMonthsData(month: any)
  {
    this.getAgentsEnquiriesAndConnections(month);
  }

  getSelectedYearlyData(year: any)
  {
    this.getAgentsEnquiriesAndConnectionsYearly(year);
  }

  enquiryList:any = [];
  getAgentsEnquiriesAndConnections(selectedMonth)
  {
    
    this._MastersService.getAgentsEnquiriesAndConnections({selectedMonth: selectedMonth}).subscribe((res:any)=>{
      if(!res.status)
    {
      this.enquiryList = res;
    }
    });
  }

  getAgentsEnquiriesAndConnectionsYearly(selectedYear)
  {
    
    this._MastersService.getAgentsEnquiriesAndConnectionsYearly({selectedYear: selectedYear}).subscribe((res:any)=>{
      if(!res.status)
    {
      this.enquiryList = res;
    }
    });
  }

  getConnectionCount()
  {
      return this.enquiryList.filter((val)=>{
        return val.conectionstats == 1;
      }).length
  }

}
