import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {  FileUploader } from 'ng2-file-upload';
import { SiteadminService } from '../../../services/siteadmin.service';
import Swal from 'sweetalert2';

const deleteConfirm = {
  title: 'Are you sure?',
  text: 'Want to delete this record?',
  type: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Yes, proceed!',
  cancelButtonText: 'No, keep it'
}

var alertPopup = {
  title: undefined,
  text: undefined,
  type: undefined,
}

@Component({
  selector: 'app-product-unit-details',
  templateUrl: './product-unit-details.component.html',
  styleUrls: ['./product-unit-details.component.scss']
})
export class ProductUnitDetailsComponent implements OnInit {

  @ViewChild("fileInput", {static: false}) fileInput: ElementRef;
  files  = []; 
  productImages  = []; 
  productUnitDetails:any = {};
  unitid:number;
  unitStatusOptions:any = [
    {id:1, title:'Active'},
    {id:0, title:'Deactive'},
    ];

    public uploader: FileUploader = new FileUploader({
      isHTML5: true
    });

    constructor(private _SiteadminService : SiteadminService, public _location: Location, private activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.unitid = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getProductsList();
    this.getManufacturelsList();
    this.getUnitsList();
    this.getCatagoriesList();
    if(this.unitid > 0)
    {
      this.getProductUnitDetails(this.unitid);
      this.getProductUnitImages(this.unitid);
    }
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

Product_details:any = {};
getProductDetails(id)
  {
    this._SiteadminService.getProductDetails(id).subscribe((res:any)=>{
      if(!res.status)
      {
        this.Product_details = res[0];
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

  manufacturelsList:any;
  getManufacturelsList()
{
  this._SiteadminService.getManufacturelsList().subscribe((res:any)=>{
    if(!res.status)
  {
    this.manufacturelsList = res;
  }
  });
}

catagoryiesList:any;
getCatagoriesList()
{
  this._SiteadminService.getCatagoriesList().subscribe((res:any)=>{
    if(!res.status)
  {
    this.catagoryiesList = res;
  }
  });
}

getProductUnitDetails(id)
  {
    this._SiteadminService.getProductUnitDetails(id).subscribe((res:any)=>{
      if(!res.status)
      {
        this.productUnitDetails = res[0];
      }
    });
    
  }

  productUnitImages:any;
getProductUnitImages(id)
  {
    this._SiteadminService.getProductUnitImages(id).subscribe((res:any)=>{
      if(!res.status)
      {
        this.productUnitImages = res;
      }
    });
    
  }

  verifyIndex(item)
  {
      if(item.index > this.uploader.queue.length)
      {
        var resAlert ={
          title: "Error",
          text: 'Index does not greater than number of selected images',
          type: 'error',
        }
         Swal.fire(resAlert).then((result) => {
            item.index = undefined;
          });

      }
  }

  sortByIndex()
  {
    if(this.uploader.queue.length > 0)
    {
      this.uploader.queue.map((value)=>{
          if(value.index == undefined || value.index == null)
          {
            this.uploader.queue.map((val, index)=>{
              val.index = index;
            });
          }

      });
    }
  
      this.uploader.queue.sort(function(obj1, obj2){return obj1.index - obj2.index});
    
  }
  
  OpenFileSelector()
  {
    const fileInput = this.fileInput.nativeElement;
    fileInput.click();  
  }

  RemoveImage(item)
  {
    this.uploader.queue.splice(this.uploader.queue.indexOf(item),1);
  }

  deleteProductImage(item)
  {

    Swal.fire(deleteConfirm).then((result) => {
      if (result.value) {
    this._SiteadminService.deleteProductImage(item).subscribe((res: any) => {
      alertPopup.text = res.message;
      alertPopup.title = res.title;
      alertPopup.type = res.type;
 
      Swal.fire(alertPopup).then((result) => {
        if (res.status === 0) {
  
        } else {
          this.productUnitImages.splice(this.productUnitImages.indexOf(item),1);
        }
      });
    });
  } else if (result.dismiss === Swal.DismissReason.cancel) {
    Swal.fire(
      'Cancelled',
      'Your imaginary file is safe :)',
      'error'
    )
  }
  });

    
  }

  saveProductUnitDetails()
  {

    this.sortByIndex();
    let data = new FormData();
    if (this.uploader.queue.length > 0) {
      this.uploader.queue.map((value, index)=>{
        data.append('file'+index, value._file);
      });
      
    }

    if(this.productUnitDetails.status == undefined || this.productUnitDetails.status == null)
    {
        this.productUnitDetails.status = 1;
    }

    data.append('productUnitDetails', JSON.stringify(this.productUnitDetails));

    this._SiteadminService.saveProductUnitDetails(data).subscribe((res: any) => {
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
