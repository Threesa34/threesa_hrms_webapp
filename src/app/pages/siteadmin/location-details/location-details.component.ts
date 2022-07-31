import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SiteadminService } from '../../../services/siteadmin.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.scss']
})
export class LocationDetailsComponent implements OnInit {

locationDetails: any = {};
locationid:number;

locationStatusOptions:any = [
{id:1, title:'Active'},
{id:0, title:'Deactive'},
];
  constructor(private _SiteadminService : SiteadminService, public _location: Location, private activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.locationid = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getManagersList();
    if(this.locationid > 0)
    {
      this.getLocationDetails();
    }
  }

  getCurrentLocation()
  {
    if (navigator)
    {
    navigator.geolocation.getCurrentPosition( pos => {
      console.log(pos)
        this.locationDetails.lang = +pos.coords.longitude;
        this.locationDetails.lat = +pos.coords.latitude;
      });
    }
  }

  DuplicateContactExist:boolean;


  VerifyDuplicateContact()
  {
    if(this.locationDetails.contact1 != undefined && this.locationDetails.contact1 != null && this.locationDetails.contact1 != '' && this.locationDetails.contact1.length == 10)
    {
      this._SiteadminService.VerifyDuplicateContact(this.locationDetails.contact1, this.locationid).subscribe((res:any)=>{
        if(!res.status)
        {
           if(res[0].contactExist > 0) 
          {
            this.DuplicateContactExist = true;
            var resAlert ={
              title: 'Warning',
              text: '(Contact No.) Contact already exist database',
              type: 'error',
            }
          Swal.fire(resAlert).then((result) => {
            
            });
          }
        }
        
      });
    }
    if(this.locationDetails.contact2 != undefined && this.locationDetails.contact2 != null && this.locationDetails.contact2 != '' && this.locationDetails.contact2.length == 10)
    {
      this._SiteadminService.VerifyDuplicateContact(this.locationDetails.contact2, this.locationid).subscribe((res:any)=>{
        if(!res.status)
        {
          if(res[0].contactExist > 0) 
          {
            this.DuplicateContactExist = true;
            var resAlert ={
              title: 'Warning',
              text: '(Alt. Contact No.) Contact already exist database',
              type: 'error',
            }
          Swal.fire(resAlert).then((result) => {
            
            });
          }
        }
        
      });
    }
  }

  VerifyForm()
  { 
    if((this.locationDetails.name != undefined && this.locationDetails.name != null && this.locationDetails.name != '') && (this.locationDetails.address != undefined && this.locationDetails.address != null && this.locationDetails.address != '') && (this.locationDetails.contact1 != undefined && this.locationDetails.contact1 != null && this.locationDetails.contact1 != 0 && (this.locationDetails.contact1.toString().length == 10)))
    {
      return false
    }
    return true;
  }


 managersList:any;
  getManagersList()
  {
    this._SiteadminService.getManagersList(this.locationid).subscribe((res:any)=>{
      if(!res.status)
      {
        this.managersList = res;
      }
    });
    
  }

  getLocationDetails()
  {
    this._SiteadminService.getLocationDetails(this.locationid).subscribe((res:any)=>{
      if(!res.status)
      {
        this.locationDetails = res[0];
      }
    });
    
  }

  saveLocationDetails()
  {
    this._SiteadminService.saveLocationDetails(this.locationDetails).subscribe((res: any) => {
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
