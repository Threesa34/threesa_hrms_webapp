import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SiteadminService } from '../../../services/siteadmin.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-goods-details',
  templateUrl: './goods-details.component.html',
  styleUrls: ['./goods-details.component.scss']
})
export class GoodsDetailsComponent implements OnInit {

  goodsDetails: any = {};
  goodsid:number;

  purchaseStatus:any = [
    {id:0, title:'Pending'},
    {id:1, title:'Forwarded'},
    {id:2, title:'Cancled'}
  ]


  constructor(private _SiteadminService : SiteadminService, public _location: Location, private activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.goodsid = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    if(this.goodsid > 0)
    {
      this.getGoodsRecieptDetails();
    }
    else
    {
      this.goodsDetails.PurchaseItems = [{}];
    }
    
  }


  calculatenetAmount()
 {
  if(this.goodsDetails.cgst == undefined || this.goodsDetails.cgst == null || isNaN(this.goodsDetails.cgst))
  {
    this.goodsDetails.cgst = 0;
  }
  if(this.goodsDetails.sgst == undefined || this.goodsDetails.sgst == null || isNaN(this.goodsDetails.sgst))
  {
    this.goodsDetails.sgst = 0;
  }
  if(this.goodsDetails.igst == undefined || this.goodsDetails.igst == null || isNaN(this.goodsDetails.igst))
  {
    this.goodsDetails.igst = 0;
  }

  this.goodsDetails.cgstAmount = parseFloat(this.goodsDetails.gross_amount) * parseFloat(this.goodsDetails.cgst)/100
  this.goodsDetails.sgstAmount = parseFloat(this.goodsDetails.gross_amount) * parseFloat(this.goodsDetails.sgst)/100
  this.goodsDetails.igstAmount = parseFloat(this.goodsDetails.gross_amount) * parseFloat(this.goodsDetails.igst)/100

  this.goodsDetails.net_amount =  parseFloat(this.goodsDetails.gross_amount) + parseFloat(this.goodsDetails.cgstAmount) + parseFloat(this.goodsDetails.sgstAmount) + parseFloat(this.goodsDetails.igstAmount);
 }

 calculateUnitPrice(data)
 {
    data.price = 0;
    if(data.gr_qty != undefined && data.gr_qty > 0 && data.net_price != undefined && data.net_price > 0)
    {
      data.price = parseFloat(data.net_price)/parseFloat(data.gr_qty);
    }

    this.goodsDetails.gross_amount = 0;
    if(this.goodsDetails.PurchaseItems.length > 0)
    {
      this.goodsDetails.PurchaseItems.map((value, index)=>{
        if(value.net_price == undefined || isNaN(value.net_price) || value.net_price == null)
        {
          value.net_price = 0;
        }
        this.goodsDetails.gross_amount = parseFloat(this.goodsDetails.gross_amount) + parseFloat(value.net_price);
      });  
    }

    this.calculatenetAmount();


 }

  getGoodsRecieptDetails()
  {

    this._SiteadminService.getGoodsRecieptDetails(this.goodsid).subscribe((res:any)=>{
      if(!res.status)
    {
      this.goodsDetails = res[0];
 
      if(this.goodsDetails.PurchaseItems.length > 0)
      {
        this.calculatenetAmount();
       this.goodsDetails.PurchaseItems.map((val)=>{
       })  
      }
 
    }
    });
  }

  updateGoodsRecieptsDetails()
 {
  this._SiteadminService.updateGoodsRecieptsDetails(this.goodsDetails).subscribe((res: any) => {
    var resAlert ={
      title: res.title,
      text: res.message,
      type: res.type,
    }
     Swal.fire(resAlert).then((result) => {
      if (res.status === 1) {
           this._location.back();
      } else {
      }
    }); 
  });
 }

  
}
