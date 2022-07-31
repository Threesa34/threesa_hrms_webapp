import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {  FileUploader } from 'ng2-file-upload';
import {Location} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MastersService } from '../../../services/masters.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {

  @ViewChild("fileInput", {static: false}) fileInput: ElementRef;
  files  = [];  
  ShowReset = false;


  companyDetails:any;
  countriesList:any;
  statesList:any;
  citiesList:any;
  _statusOptions:any = [
    {id:1, title:'Active'},
    {id:0, title:'Deactive'},
    ];
  logo:any;
  public uploader: FileUploader = new FileUploader({
    isHTML5: true
  });
  constructor(private _MastersService: MastersService, private _location: Location, private activatedRoute: ActivatedRoute, ) { 
  }
  country:number;
  ngOnInit(): void {
    this.getCountriesList();

    var companyid = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    if(companyid && companyid > 0){
      this.companyDetails = {};
      this.getCompanyDetails(companyid);
    }
    else
    {
      this.companyDetails = {};
      if(this.companyDetails.logo == undefined)
        {
          this.logo = 'http://localhost:8018/uploads/company/default.jpg';
        }
    }
    
  }

  getCountriesList()
  {
      this._MastersService.getCountriesList().subscribe((res:any)=>{
        if(res.status == undefined)
        this.countriesList = res;
      });
  }

  getStatesOnCountry(countryid)
  {
      this._MastersService.getStatesOnCountry(countryid).subscribe((res:any)=>{
        if(res.status == undefined)
        this.statesList = res;
      });
  }

  getCityListOnState(countryid)
  {
      this._MastersService.getCityListOnState(countryid).subscribe((res:any)=>{
        if(res.status == undefined)
        this.citiesList = res;
      });
  }

  resetImage()
  {
    this.fileInput.nativeElement.value = '';
        if(this.companyDetails.logo == undefined)
        {
          this.logo = 'http://localhost:8018/uploads/company/default.jpg';
        }
        else
       this.logo = this.companyDetails.logo;
    this.ShowReset = false;
  }
  previewUpload()
  {
    const file = this.files[0].data;
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.logo = reader.result as string;
      
    }
    reader.readAsDataURL(file);
    this.ShowReset = true;
  }

  OpenFileSelector()
  {
    const fileInput = this.fileInput.nativeElement;
    fileInput .onchange = () => {  
        for (let index = 0; index < fileInput .files.length; index++)  
        {  
             const file = fileInput .files[index];  
             this.files.push({ data: file, inProgress: false, progress: 0});  
        }  
          this.previewUpload();  
    };  
    fileInput.click();  
  }

  SaveCompanyDetails()
  {
    
    let data = new FormData();
    if (this.uploader.queue.length > 0) {
      data.append('file', this.uploader.queue[0]._file);
    }
    data.append('companyDetails', JSON.stringify(this.companyDetails));

    this._MastersService.saveCompanydetails(data).subscribe((res: any) => {
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

  getCompanyDetails(companyid)
  {
    this._MastersService.getCompanyDetails(companyid).subscribe((res:any)=>{
      
      {
        this.companyDetails = res;
        
        console.log(this.companyDetails);

        this.logo = this.companyDetails.logo;
        this.getStatesOnCountry(this.companyDetails.country);
        this.getCityListOnState(this.companyDetails.state);
      }
      
    });
  }



}
