import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SiteadminService } from '../../../services/siteadmin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-purchase-details',
  templateUrl: './purchase-details.component.html',
  styleUrls: ['./purchase-details.component.scss']
})
export class PurchaseDetailsComponent implements OnInit {

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

 RemoveItem(data, index)
 {
   if(data.id != undefined)
   {
    this._SiteadminService.deletePurchaseItem(data.id).subscribe((res:any)=>{
      if(res.status == 1)
    {
      this.purchaseDetails.PurchaseItems.splice(index, 1);
    }
    });
   }
   else
   {
    this.purchaseDetails.PurchaseItems.splice(index, 1);
   }
 }

 AddNewItem()
 {
   if(this.purchaseDetails.PurchaseItems.length > 0)
   {
      if(this.purchaseDetails.PurchaseItems[this.purchaseDetails.PurchaseItems.length -1].product_id != undefined && this.purchaseDetails.PurchaseItems[this.purchaseDetails.PurchaseItems.length -1].qty != undefined)
      {
        this.purchaseDetails.PurchaseItems.push({});
      }
   }
   else
   {
    this.purchaseDetails.PurchaseItems.push({});
   }
 }


 savePurchaseDetails()
 {
  this._SiteadminService.savePurchaseDetails(this.purchaseDetails).subscribe((res: any) => {
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
