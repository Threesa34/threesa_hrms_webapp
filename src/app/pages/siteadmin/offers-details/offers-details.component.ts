import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {Location} from '@angular/common';
import {  FileUploader } from 'ng2-file-upload';
import { ActivatedRoute, Router } from '@angular/router';
import { SiteadminService } from '../../../services/siteadmin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-offers-details',
  templateUrl: './offers-details.component.html',
  styleUrls: ['./offers-details.component.scss']
})
export class OffersDetailsComponent implements OnInit {
  offerDetails: any = {};
  offerid:number;
  @ViewChild("fileInput", {static: false}) fileInput: ElementRef;
  ShowReset = false;


  _statusOptions:any = [
  {id:1, title:'Active'},
  {id:0, title:'Deactive'},
  ];


  public uploader: FileUploader = new FileUploader({
    isHTML5: true
  });

    constructor(private _SiteadminService : SiteadminService, public _location: Location, private activatedRoute: ActivatedRoute,) { 

      

    }
  
    ngOnInit(): void {
      this.offerid = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
      this.getCatagoriesList();
      this.getProductsList();
      if(this.offerid > 0)
      {
        this.getOfferDetails();
      }
      
    }

    catagoryList:any;
    getCatagoriesList()
{
  this._SiteadminService.getCatagoriesList().subscribe((res:any)=>{
    if(!res.status)
  {
    this.catagoryList = res;
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
    
  getOfferDetails()
  {
    this._SiteadminService.getOfferDetails(this.offerid).subscribe((res:any)=>{
      if(!res.status)
      {
        this.offerDetails = res[0];
      }
    });
    
  }


  saveOfferDetails()
  {
    let data = new FormData();
    if (this.uploader.queue.length > 0) {
      data.append('file', this.uploader.queue[0]._file);
    }

    if(typeof this.offerDetails.catagoryids == 'object')
    {
      this.offerDetails.catagoryids = JSON.stringify(this.offerDetails.catagoryids);
    }
    if(typeof this.offerDetails.productids == 'object')
    {
      this.offerDetails.productids = JSON.stringify(this.offerDetails.productids);
    }

    data.append('offerDetails', JSON.stringify(this.offerDetails));

    this._SiteadminService.saveOfferDetails(data).subscribe((res: any) => {
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
