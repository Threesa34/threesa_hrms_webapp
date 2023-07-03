import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MastersService } from '../../../services/masters.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  constructor(private _router : Router, private _MastersService : MastersService) { }

  ngOnInit(): void {
    this.getRedeemTransactinsList();
  }

  transactionsList: any = [];
  getRedeemTransactinsList()
  {
    this._MastersService.getRedeemTransactinsList().subscribe((res:any)=>{
      if(!res.status)
    {
      this.transactionsList = res;
    }
    });
  }

  getTotalRedeemPoints()
  {
    if(Array.isArray(this.transactionsList) && this.transactionsList.length > 0)
     return this.transactionsList.reduce(function (total, obj) { return total + obj.redeem_points; }, 0);
     else
     return 0;
  }
}
