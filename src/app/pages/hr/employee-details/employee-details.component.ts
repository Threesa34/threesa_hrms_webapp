import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {  FileUploader } from 'ng2-file-upload';
import {Location} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MastersService } from '../../../services/masters.service';
import { environment } from '../../../../environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {

  @ViewChild("fileInput", {static: false}) fileInput: ElementRef;
  @ViewChild("documents_upload_uid", {static: false}) documents_upload_uid: ElementRef;
  @ViewChild("documents_upload_resume", {static: false}) documents_upload_resume: ElementRef;
  files  = [];  
  ShowReset = false;

_location_permission = [{status:0, title:'Off'}, {status:1, title:'On'}];

  userDetails:any = {};
  profilepic:any;

  public uploader: FileUploader = new FileUploader({
    isHTML5: true
  });
  constructor(private _MastersService: MastersService, public _location: Location, private activatedRoute: ActivatedRoute) { }

  adhaar_pic;resume;
  ngOnInit(): void {
    this.getStatusOptions();
    this.getManagersList();
    this.getUserRoles();
    var employeeid = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getworkingShiftList();
    this.getActivateDesignationList();
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


  statusOptions:any;

  getStatusOptions()
  {
    this.statusOptions =  this._MastersService.getStatusOptions(); 
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

  previewUploadedAdhaarFile()
  {
   
    const fileInput = this.documents_upload_uid.nativeElement;
    fileInput .onchange = () => {  
        for (let index = 0; index < fileInput .files.length; index++)  
        {  
             const file = fileInput .files[index];  
             this.files.push({ data: file, inProgress: false, progress: 0});  
        } 
        const file = this.files[this.files.length - 1].data;

        this.uploader.queue[this.uploader.queue.length - 1]['type'] = 'uid';

        // File Preview
        const reader = new FileReader();
        reader.onload = () => {
          this.adhaar_pic = reader.result as string;
        }
        reader.readAsDataURL(file);
    };
    

  }

  previewUploadedResumeFile()
  {
   
    const fileInput = this.documents_upload_resume.nativeElement;
    fileInput .onchange = () => {  
        for (let index = 0; index < fileInput .files.length; index++)  
        {  
             const file = fileInput .files[index];  
             this.files.push({ data: file, inProgress: false, progress: 0});  
        } 
        const file = this.files[this.files.length - 1].data;

        this.uploader.queue[this.uploader.queue.length - 1]['type'] = 'resume';

        // File Preview
        const reader = new FileReader();
        reader.onload = () => {
          this.resume = reader.result as string;
        }
        reader.readAsDataURL(file);
    };
    

  }

  workingShiftList:any;
  getworkingShiftList()
  {
    this._MastersService.getActivateWorkingShiftList().subscribe((res:any)=>{
      if(!res.status)
    {
      this.workingShiftList = res;
    }
    });
  }
 

  designationList:any;
  getActivateDesignationList()
  {
    this._MastersService.getActivateDesignationList().subscribe((res:any)=>{
      if(!res.status)
    {
      this.designationList = res;
    }
    });
  }
 

  saveUserDetails()
  {
    let data = new FormData();
    if (this.uploader.queue.length > 0) {
      for(var i =0 ; i < this.uploader.queue.length; i++)
      {
          if(this.uploader.queue[i]['type'] == undefined)
          {
            data.append('file', this.uploader.queue[i]._file);
          }
          if(this.uploader.queue[i]['type'] == 'uid')
          {
            data.append('uid', this.uploader.queue[i]._file);
          }
          if(this.uploader.queue[i]['type'] == 'resume')
          {
            data.append('resume', this.uploader.queue[i]._file);
          }
      }
     
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
  userRoles:any;
  getUserRoles()
  {
    this._MastersService.getUserRoles().subscribe((res:any)=>{
      
      {
        this.userRoles = res;
      }
      
    });
  }

  ManagersList:any;
  getManagersList()
  {
    this._MastersService.getManagersList().subscribe((res:any)=>{
      
      {
        this.ManagersList = res;
      }
      
    });
  }


  getUserDetails(userid)
  {
    this._MastersService.getUserDetails(userid).subscribe((res:any)=>{
      
      {
        this.userDetails = res;
        this.profilepic = environment.endpoint_url+'/uploads/employee/'+this.userDetails.profilepic;
        this.adhaar_pic = environment.endpoint_url+'/uploads/employee/'+this.userDetails.adhaar_pic;
        this.resume = environment.endpoint_url+'/uploads/employee/'+this.userDetails.resume;
      }
      
    });
  }


}
