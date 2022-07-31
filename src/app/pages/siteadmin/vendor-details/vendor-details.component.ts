import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SiteadminService } from '../../../services/siteadmin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vendor-details',
  templateUrl: './vendor-details.component.html',
  styleUrls: ['./vendor-details.component.scss']
})
export class VendorDetailsComponent implements OnInit {



  vendorDetails:any = {};


  constructor(private _SiteadminService: SiteadminService, public _location: Location, private activatedRoute: ActivatedRoute, ) { 
  }
  ngOnInit(): void {
    

    var vendorid = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    if(vendorid && vendorid > 0){
      this.getVendorDetails(vendorid);
    
    }
    
  }

 
  SavevendorDetails()
  {
  
    this._SiteadminService.saveVendorDetails(this.vendorDetails).subscribe((res: any) => {
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

  getVendorDetails(vendorid)
  {
    this._SiteadminService.getVendorDetails(vendorid).subscribe((res:any)=>{
      if(!res.status)
      {
        this.vendorDetails = res[0];
      }
      
    });
  }



}
