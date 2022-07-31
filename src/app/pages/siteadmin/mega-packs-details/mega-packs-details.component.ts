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
  selector: 'app-mega-packs-details',
  templateUrl: './mega-packs-details.component.html',
  styleUrls: ['./mega-packs-details.component.scss']
})
export class MegaPacksDetailsComponent implements OnInit {

  @ViewChild("fileInput", {static: false}) fileInput: ElementRef;
  megaPackDetails:any = {};
  megapack_id:number;
  pack_image:any;
  files:any = [];
  prd_unit = '';
  ShowReset:boolean;
  _StatusOptions:any = [
    {id:1, title:'Active'},
    {id:0, title:'Deactive'},
    ];

    public uploader: FileUploader = new FileUploader({
      isHTML5: true
    });

  constructor(private _SiteadminService : SiteadminService, public _location: Location, private activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.getprodctUnits();
    this.megapack_id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    if(this.megapack_id > 0)
    {
      this.getMegapackDetails();
    }
    else
    {
      if(this.megaPackDetails.pack_image == undefined)
        {
          this.pack_image = 'http://localhost:8018/uploads/company/default.jpg';
        }
    }

  
  }

  productsUnitsList:any;
  getprodctUnits()
{
  this._SiteadminService.getprodctUnits().subscribe((res:any)=>{
    if(!res.status)
  {
    this.productsUnitsList = res;
  }
  });
}
  productsDetails:any;
  getMegapackProductDetails()
{
  this._SiteadminService.getMegapackProductDetails(this.megapack_id).subscribe((res:any)=>{
    if(!res.status)
  {
    this.productsDetails = res;
  }
  });
}

selectedProducts:any =[];
checkExistanceOfUnit(unitObject)
{
    if(this.selectedProducts.length > 0)
    {
        var filteredItem = this.selectedProducts.filter((value)=>{
            return  value == unitObject.id;
        });
        if(filteredItem != undefined && filteredItem.length > 0)
        {
          this.selectedProducts.splice(this.selectedProducts.indexOf(unitObject.id), 1);
        }
        else
        {
          this.selectedProducts.push(unitObject.id);
        }
    }
    else
    {
      this.selectedProducts.push(unitObject.id);
    }
}

selected_products:any = [];
getMegapackDetails()
{
  this._SiteadminService.getMegapackDetails(this.megapack_id).subscribe((res:any)=>{
    if(!res.status)
  {
    this.megaPackDetails = res[0];
    this.pack_image = this.megaPackDetails.pack_image;
    this.selectedProducts = JSON.parse(this.megaPackDetails.productids);
    this.checkProductExist()
  }
  });
}

deleteImage()
{

}

checkProductExist()
{
  this.selectedProducts.map((value)=>{
      this.productsUnitsList.map((val)=>{
       if(value == val.id)
       {
          val.bool = true;
       }
    });
  });
}

resetImage()
  {
    this.fileInput.nativeElement.value = '';
        if(this.megaPackDetails.pack_image == undefined)
        {
          this.pack_image = 'http://localhost:8018/uploads/company/default.jpg';
        }
        else
       this.pack_image = this.megaPackDetails.pack_image;
    this.ShowReset = false;
  }

  previewUpload()
  {
    const file = this.files[0].data;
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.pack_image = reader.result as string;
      
    }
    reader.readAsDataURL(file);
    this.ShowReset = true;
  }

  OpenFileSelector()
  {
    const fileInput = this.fileInput.nativeElement;
    fileInput .onchange = () => {  
        for (let index = 0; index < fileInput.files.length; index++)  
        {  
             const file = fileInput.files[index];  
             this.files.push({ data: file, inProgress: false, progress: 0});  
        }  
          this.previewUpload();  
    };  
    fileInput.click();  
  }

  

  saveMegapackDetails()
  {

    let data = new FormData();
    if (this.uploader.queue.length > 0) {
      this.uploader.queue.map((value, index)=>{
        data.append('file'+index, value._file);
      });
      
    }

    if(this.megaPackDetails.status == undefined || this.megaPackDetails.status == null)
    {
        this.megaPackDetails.status = 1;
    }

    this.megaPackDetails.productids = JSON.stringify(this.selectedProducts);

    data.append('megaPackDetails', JSON.stringify(this.megaPackDetails));
    
    this._SiteadminService.saveMegapackDetails(data).subscribe((res: any) => {
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
