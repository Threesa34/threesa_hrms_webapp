import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SiteadminService } from '../../../services/siteadmin.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-goods-entry',
  templateUrl: './goods-entry.component.html',
  styleUrls: ['./goods-entry.component.scss']
})
export class GoodsEntryComponent implements OnInit {

  purchaseDetails: any = {};
  purchaseid:number;

  purchaseStatus:any = [
    {id:0, title:'Pending'},
    {id:1, title:'Forwarded'},
    {id:2, title:'Cancled'}
  ]

  constructor(private _SiteadminService : SiteadminService, public _location: Location, private activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.purchaseid = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getProductsList();
    this.getUnitsList();
    this.getVendorsList();
    if(this.purchaseid > 0)
    {
      this.getPurchaseDetails();
    }
    else
    {
      this.purchaseDetails.PurchaseItems = [{}];
    }
    
  }


  vendorsList:any;
  getVendorsList()
  {
    this._SiteadminService.getVendorsList().subscribe((res:any)=>{
      if(!res.status)
    {
      this.vendorsList = res;
    }
    });
  }
  productsList:any;
  getProductsList()
{
  this._SiteadminService.getProductsList().subscribe((res:any)=>{
    if(!res.status)
  {
    this.productsList = res;
  }
  });
}

Product_units:any;
getUnitsList()
  {
    this._SiteadminService.getUnitsList().subscribe((res:any)=>{
      if(!res.status)
      {
        this.Product_units = res;
      }
    });
    
  }

  productUnitsList:any;
  getProductUnitsOnProduct(data)
 {
   this._SiteadminService.getProductUnitsOnProduct(data.product_id).subscribe((res:any)=>{
     if(!res.status)
   {
     data.productUnitsList = res;
   }
   });
 }

  getPurchaseDetails()
 {
   this._SiteadminService.getPurchaseDetails(this.purchaseid).subscribe((res:any)=>{
     if(!res.status)
   {
     this.purchaseDetails = res[0];

     if(this.purchaseDetails.PurchaseItems.length > 0)
     {
      this.purchaseDetails.PurchaseItems.map((val)=>{
        val.productUnitsList = this.getProductUnitsOnProduct(val);
      })  
     }

   }
   });
 }

 setDefaultUnit(data)
 {
   var filtredUnit = data.productUnitsList.filter((value)=>{
      return value.id = data.unit_id;
   });

   if(filtredUnit != undefined && filtredUnit.length > 0)
      data.unit = filtredUnit[0].unit;
 }


 calculatenetAmount()
 {
  if(this.purchaseDetails.cgst == undefined || this.purchaseDetails.cgst == null || isNaN(this.purchaseDetails.cgst))
  {
    this.purchaseDetails.cgst = 0;
  }
  if(this.purchaseDetails.sgst == undefined || this.purchaseDetails.sgst == null || isNaN(this.purchaseDetails.sgst))
  {
    this.purchaseDetails.sgst = 0;
  }
  if(this.purchaseDetails.igst == undefined || this.purchaseDetails.igst == null || isNaN(this.purchaseDetails.igst))
  {
    this.purchaseDetails.igst = 0;
  }

  this.purchaseDetails.cgstAmount = parseFloat(this.purchaseDetails.gross_amount) * parseFloat(this.purchaseDetails.cgst)/100
  this.purchaseDetails.sgstAmount = parseFloat(this.purchaseDetails.gross_amount) * parseFloat(this.purchaseDetails.sgst)/100
  this.purchaseDetails.igstAmount = parseFloat(this.purchaseDetails.gross_amount) * parseFloat(this.purchaseDetails.igst)/100

  this.purchaseDetails.net_amount =  parseFloat(this.purchaseDetails.gross_amount) + parseFloat(this.purchaseDetails.cgstAmount) + parseFloat(this.purchaseDetails.sgstAmount) + parseFloat(this.purchaseDetails.igstAmount);
 }

 calculateUnitPrice(data)
 {
    data.price = 0;
    if(data.gr_qty != undefined && data.gr_qty > 0 && data.net_price != undefined && data.net_price > 0)
    {
      data.price = parseFloat(data.net_price)/parseFloat(data.gr_qty);
    }

    this.purchaseDetails.gross_amount = 0;
    if(this.purchaseDetails.PurchaseItems.length > 0)
    {
      this.purchaseDetails.PurchaseItems.map((value, index)=>{
        if(value.net_price == undefined || isNaN(value.net_price) || value.net_price == null)
        {
          value.net_price = 0;
        }
        this.purchaseDetails.gross_amount = parseFloat(this.purchaseDetails.gross_amount) + parseFloat(value.net_price);
      });  
    }



 }

 saveGoodsRecieptsDetails()
 {
  this._SiteadminService.saveGoodsRecieptsDetails(this.purchaseDetails).subscribe((res: any) => {
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
