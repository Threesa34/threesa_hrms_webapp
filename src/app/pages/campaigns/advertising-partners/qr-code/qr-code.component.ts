import { Component, OnInit, Inject, ViewChild, ElementRef, AfterViewInit  } from '@angular/core';
import { MastersService } from '../../../../services/masters.service';
import { environment } from '../../../../../environments/environment';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import QRCodeStyling from 'qr-code-styling';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss']
})
export class QrCodeComponent implements OnInit {

  
  panelOpenState = false;
  url:any;
  personDetails:any = {};

  data:any;

  loader:boolean = true;

  imagePath:any;
  imgURL: any;
  message: any;

  constructor(private _MastersService: MastersService, @Inject(MAT_DIALOG_DATA) public persondata: any) { }

  ngOnInit(): void {
    if(this.persondata != undefined && this.persondata != null && this.persondata != '')
    {
      this.personDetails = this.persondata[0];
      console.log(this.personDetails)
      this.url = "https://www.threesainfoway.net/enquiry.html";
      this.data = {"width":300,"height":300,"data":"","margin":0,"qrOptions":{"typeNumber":"0","mode":"Byte","errorCorrectionLevel":"Q"},"imageOptions":{"hideBackgroundDots":true,"imageSize":0.4,"margin":0},"dotsOptions":{"type":"square","color":"#000000"},"backgroundOptions":{"color":"#ffffff"},"image":"","dotsOptionsHelper":{"colorType":{"single":true,"gradient":false},"gradient":{"linear":true,"radial":false,"color1":"#6a1a4c","color2":"#6a1a4c","rotation":"0"}},"cornersSquareOptions":{"type":"","color":"#000000"},"cornersSquareOptionsHelper":{"colorType":{"single":true,"gradient":false},"gradient":{"linear":true,"radial":false,"color1":"#000000","color2":"#000000","rotation":"0"}},"cornersDotOptions":{"type":"","color":"#000000"},"cornersDotOptionsHelper":{"colorType":{"single":true,"gradient":false},"gradient":{"linear":true,"radial":false,"color1":"#000000","color2":"#000000","rotation":"0"}},"backgroundOptionsHelper":{"colorType":{"single":true,"gradient":false},"gradient":{"linear":true,"radial":false,"color1":"#ffffff","color2":"#ffffff","rotation":"0"}}};
  
       this.GenerateQRCode();
      setTimeout(()=>{                           
        this.loader = false;
    }, 1000);

    }
  }

  qrCode: any;

  GenerateQRCode()
  {
   
    this.data.data = this.url+"?source="+this.personDetails.unique_number;

    this.qrCode = new QRCodeStyling(this.data);

    var canvas = <HTMLElement>document.getElementById("canvas");
    try{
      canvas.innerHTML = '';
    }
    catch(ex){}


    this.qrCode.append(canvas); 
    
 
  }

  DownloadQRCode(format)
  {
    var filename = 'QR-'+ new Date().getTime()+'.'+format;
    this.qrCode.download({ name: filename, extension: format});
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000);
    }

    return value;
  }

  @ViewChild('file', {static: false}) logoFile : ElementRef

  
  preview(files:any) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result;
      this.data.image = this.imgURL;
      // this.GenerateQRCode();
    }
  }

  resetSetting()
  {

    this.data = {"width":300,"height":300,"data":"","margin":0,"qrOptions":{"typeNumber":"0","mode":"Byte","errorCorrectionLevel":"Q"},"imageOptions":{"hideBackgroundDots":true,"imageSize":0.4,"margin":0},"dotsOptions":{"type":"square","color":"#000000"},"backgroundOptions":{"color":"#ffffff"},"image":"","dotsOptionsHelper":{"colorType":{"single":true,"gradient":false},"gradient":{"linear":true,"radial":false,"color1":"#6a1a4c","color2":"#6a1a4c","rotation":"0"}},"cornersSquareOptions":{"type":"","color":"#000000"},"cornersSquareOptionsHelper":{"colorType":{"single":true,"gradient":false},"gradient":{"linear":true,"radial":false,"color1":"#000000","color2":"#000000","rotation":"0"}},"cornersDotOptions":{"type":"","color":"#000000"},"cornersDotOptionsHelper":{"colorType":{"single":true,"gradient":false},"gradient":{"linear":true,"radial":false,"color1":"#000000","color2":"#000000","rotation":"0"}},"backgroundOptionsHelper":{"colorType":{"single":true,"gradient":false},"gradient":{"linear":true,"radial":false,"color1":"#ffffff","color2":"#ffffff","rotation":"0"}}};

    this.imgURL = ""; 
    
    this.logoFile.nativeElement.value = "";
    
    
    
    
  }


}
