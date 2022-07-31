import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {  FileUploader } from 'ng2-file-upload';
import {Location} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MastersService } from '../../../services/masters.service';
import { SiteadminService } from '../../../services/siteadmin.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  
  @ViewChild("fileInput", {static: false}) fileInput: ElementRef;
  files  = [];  
  ShowReset = false;


  userDetails:any = {};
  profilepic:any;

  public uploader: FileUploader = new FileUploader({
    isHTML5: true
  });
  constructor(private _MastersService: MastersService, public _location: Location, private activatedRoute: ActivatedRoute,private _SiteadminService: SiteadminService) { }

  ngOnInit(): void {

    var employeeid = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getLocationsList();
    if(employeeid && employeeid > 0){
      this.getUserDetails(employeeid);
    
    }
    else
    {
      if(this.userDetails.profilepic == undefined)
        {
          this.profilepic = 'http://localhost:8018/uploads/employee/default.jpg';
        }
    }

  }

  resetImage()
  {
    this.fileInput.nativeElement.value = '';
        if(this.userDetails.profilepic == undefined)
        {
          this.profilepic = 'http://localhost:8018/uploads/employee/default.jpg';
        }
        else
       this.profilepic = this.userDetails.profilepic;
    this.ShowReset = false;
  }
  previewUpload()
  {
    const file = this.files[0].data;
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.profilepic = reader.result as string;
      
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

  locationList:any;
  getLocationsList()
  {
    this._SiteadminService.getLocationsList().subscribe((res:any)=>{
      if(!res.status)
    {
      this.locationList = res;
    }
    });
  }
 

  saveUserDetails()
  {
    let data = new FormData();
    if (this.uploader.queue.length > 0) {
      data.append('file', this.uploader.queue[0]._file);
    }
    data.append('userDetails', JSON.stringify(this.userDetails));

    this._MastersService.saveUserDetails(data).subscribe((res: any) => {
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
  getUserDetails(userid)
  {
    this._MastersService.getUserDetails(userid).subscribe((res:any)=>{
      if(!res.status)
      {
        this.userDetails = res;
        this.profilepic = this.userDetails.profilepic;
      }
      
    });
  }

}
