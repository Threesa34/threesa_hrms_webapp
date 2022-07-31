import { Component, OnInit, Inject, ViewChild, ElementRef, AfterViewInit  } from '@angular/core';
import QRCodeStyling from 'qr-code-styling';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.html',
  styleUrls: ['./qr-codes.component.scss']
})
export class qrCodeResultComponent implements OnInit {
  
  qrCode: any;

  constructor(
    public dialogRef: MatDialogRef<qrCodeResultComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    this.generateQRCode()
  }

 
  generateQRCode()
  {
  
    this.qrCode = new QRCodeStyling(this.data.data);

    var canvas = <HTMLElement>document.getElementById("canvas");
    try{
      canvas.innerHTML = '';
    }
    catch(ex){}

   /*  if(this.data.type == 'SERIAL NUMBER')
    {

       var linebreak = document.createElement("br");
      var srno = document.createElement("small");
      srno.innerText = this.data.srno;
      canvas.appendChild(linebreak);
      canvas.appendChild(srno); 
    } */

    this.qrCode.append(canvas); 
    console.log(this.qrCode)
    

  }

  DownloadQRCode(format)
  {
    var filename = 'QR-'+ new Date().getTime()+'.'+format;
    this.qrCode.download({ name: filename, extension: format});
  }

  onNoClick(){
    this.dialogRef.close();
  }

}


@Component({
  selector: 'app-qr-codes',
  templateUrl: './qr-codes.component.html',
  styleUrls: ['./qr-codes.component.scss']
})
export class QrCodesComponent implements OnInit {

  

  @ViewChild('file', {static: false}) logoFile : ElementRef

  panelOpenState = false;

  url: any;
  value: any;
  text: any;
  serialNumber: any;
  productDetails: any;
  contactForm: any = {};
  emailForm: any = {};
  phone: any;
  sms: any = {};
  whatsapp: any = {};
  location: any = {};

  qrtype:any;

  data:any;

  loader:boolean = true;

  imagePath:any;
  imgURL: any;
  message: any;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
   
    this.qrtype = 'URL';
    this.url = "https://www.threesainfoway.net/enquiry.html";
    this.value = "website";
    this.data = {"width":300,"height":300,"data":"","margin":0,"qrOptions":{"typeNumber":"0","mode":"Byte","errorCorrectionLevel":"Q"},"imageOptions":{"hideBackgroundDots":true,"imageSize":0.4,"margin":0},"dotsOptions":{"type":"square","color":"#000000"},"backgroundOptions":{"color":"#ffffff"},"image":"","dotsOptionsHelper":{"colorType":{"single":true,"gradient":false},"gradient":{"linear":true,"radial":false,"color1":"#6a1a4c","color2":"#6a1a4c","rotation":"0"}},"cornersSquareOptions":{"type":"","color":"#000000"},"cornersSquareOptionsHelper":{"colorType":{"single":true,"gradient":false},"gradient":{"linear":true,"radial":false,"color1":"#000000","color2":"#000000","rotation":"0"}},"cornersDotOptions":{"type":"","color":"#000000"},"cornersDotOptionsHelper":{"colorType":{"single":true,"gradient":false},"gradient":{"linear":true,"radial":false,"color1":"#000000","color2":"#000000","rotation":"0"}},"backgroundOptionsHelper":{"colorType":{"single":true,"gradient":false},"gradient":{"linear":true,"radial":false,"color1":"#ffffff","color2":"#ffffff","rotation":"0"}}};

    // this.GenerateQRCode();
    setTimeout(()=>{                           
      this.loader = false;
  }, 1000);
  }

  



  

 
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

  setQRType(qrType: any)
  {
      if(qrType.index == 0)
      {
        this.qrtype = 'URL';
      }
      if(qrType.index == 1)
      {
        this.qrtype = 'TEXT';
      }
      if(qrType.index == 2)
      {
        this.qrtype = 'CONTACT';
        this.contactForm['version'] = '3.0';
      }
      if(qrType.index == 3)
      {
        this.qrtype = 'EMAIL';
      }
      if(qrType.index == 4)
      {
        this.qrtype = 'PHONE';
      }
      if(qrType.index == 5)
      {
        this.qrtype = 'SMS';
      }
      if(qrType.index == 6)
      {
        this.qrtype = 'WHATSAPP';
      }
      if(qrType.index == 7)
      {
        this.qrtype = 'LOCATION';
      }
      if(qrType.index == 8)
      {
        this.qrtype = 'SERIAL NUMBER';
      }
  }


  convertQRData()
  {
    if(this.qrtype == 'URL')
    {
      if(this.value != undefined && this.value != null && this.value != '')
      {
        return this.url+"?source="+this.value.replace(/ /g,"_");
      }
      else
       return this.url;
    }
    else if(this.qrtype == 'TEXT')
    {
      return this.text;
    }
    else if(this.qrtype == 'SERIAL NUMBER')
    {
      var text = '';
      if(this.serialNumber != undefined && this.serialNumber != null && this.serialNumber != '')
      {
        text = text + this.serialNumber;
      }
      if(this.productDetails != undefined && this.productDetails != null && this.productDetails != '')
      {
        text = text +"\n Details: "+this.productDetails;
      }
      return text;
    }
    else if(this.qrtype == 'CONTACT')
    {
      var data = "BEGIN:VCARD";
      if(this.contactForm.version != undefined && this.contactForm.version != null && this.contactForm.version != '')
      {
        data = data+ "\nVERSION:"+this.contactForm.version;
      }
      else
      {
        data = data+ "\nVERSION:3.0";
      }
      if((this.contactForm.firstname != undefined && this.contactForm.firstname != null) || (this.contactForm.lastname != undefined && this.contactForm.lastname != null))
      {
        data = data+ "\nN:"+this.contactForm.lastname+";"+this.contactForm.firstname+"\nFN:"+this.contactForm.firstname+" "+this.contactForm.lastname;
      }
      else
      {
        data = data+ "\nN:\nFN:";
      }
      if(this.contactForm.designation != undefined && this.contactForm.designation != null)
      {
        data = data+ "\nTITLE:"+this.contactForm.designation;
      }
      else
      {
        data = data+ "\nTITLE:";
      }
      if(this.contactForm.org != undefined && this.contactForm.org != null)
      {
        data = data+ "\nORG:"+this.contactForm.org;
      }
      else
      {
        data = data+ "\nORG:";
      }
      if(this.contactForm.website != undefined && this.contactForm.website != null)
      {
        data = data+ "\nURL:"+this.contactForm.website;
      }
      else
      {
        data = data+ "\nURL:";
      }
      if(this.contactForm.email != undefined && this.contactForm.email != null)
      {
        data = data+ "\nEMAIL;TYPE=INTERNET:"+this.contactForm.email;
      }
      else
      {
        data = data+ "\nEMAIL;TYPE=INTERNET:";
      }
      if(this.contactForm.w_phone != undefined && this.contactForm.w_phone != null)
      {
        data = data+ "\nTEL;TYPE=voice,work,pref:"+this.contactForm.w_phone;
      }
      else
      {
        data = data+ "\nTEL;TYPE=voice,work,pref:";
      }
      if(this.contactForm.p_phone != undefined && this.contactForm.p_phone != null)
      {
        data = data+ "\nTEL;TYPE=voice,home,pref:"+this.contactForm.p_phone;
      }
      else
      {
        data = data+ "\nTEL;TYPE=voice,home,pref:";
      }
      if(this.contactForm.p_phone != undefined && this.contactForm.p_phone != null)
      {
        data = data+ "\nTEL;TYPE=voice,home,pref:"+this.contactForm.p_phone;
      }
      else
      {
        data = data+ "\nTEL;TYPE=voice,home,pref:";
      }
      if(this.contactForm.mobile != undefined && this.contactForm.mobile != null)
      {
        data = data+ "\nTEL;TYPE=voice,cell,pref:"+this.contactForm.mobile;
      }
      else
      {
        data = data+ "\nTEL;TYPE=voice,cell,pref:";
      }
      if(this.contactForm.mobile != undefined && this.contactForm.mobile != null)
      {
        data = data+ "\nTEL;TYPE=voice,cell,pref:"+this.contactForm.mobile;
      }
      else
      {
        data = data+ "\nTEL;TYPE=voice,cell,pref:";
      }
      if(this.contactForm.w_fax != undefined && this.contactForm.w_fax != null)
      {
        data = data+ "\nTEL;TYPE=fax,work,pref:"+this.contactForm.w_fax;
      }
      else
      {
        data = data+ "\nTEL;TYPE=fax,work,pref:";
      }
      if(this.contactForm.w_fax != undefined && this.contactForm.w_fax != null)
      {
        data = data+ "\nTEL;TYPE=fax,work,pref:"+this.contactForm.w_fax;
      }
      else
      {
        data = data+ "\nTEL;TYPE=fax,work,pref:";
      }
      if(this.contactForm.p_fax != undefined && this.contactForm.p_fax != null)
      {
        data = data+ "\nTEL;TYPE=fax,home,pref:"+this.contactForm.p_fax;
      }
      else
      {
        data = data+ "\nTEL;TYPE=fax,home,pref:";
      }

      var address = '\nADR:;;';

      if(this.contactForm.street != undefined && this.contactForm.street != null)
      {
        address = address+this.contactForm.street;
      }
      else
      {
        address = address+ "";
      }
      if(this.contactForm.city != undefined && this.contactForm.city != null)
      {
        address = address+ ";"+this.contactForm.city;
      }
      else
      {
        address = address+ ";";
      }
      if(this.contactForm.state != undefined && this.contactForm.state != null)
      {
        address = address+ ";"+this.contactForm.state;
      }
      else
      {
        address = address+ ";";
      }
      if(this.contactForm.zip != undefined && this.contactForm.zip != null)
      {
        address = address+ ";"+this.contactForm.zip;
      }
      else
      {
        address = address+ ";";
      }
      if(this.contactForm.country != undefined && this.contactForm.country != null)
      {
        address = address+ ";"+this.contactForm.country+"\nEND:VCARD";
      }
      else
      {
        address = address+ ";\nEND:VCARD";
      }
      return data+address;
    }
    else if(this.qrtype == 'EMAIL')
    {
      return "mailto:"+this.emailForm.email+"?subject="+this.emailForm.subject+"&body="+this.emailForm.message+"";
    }
    else if(this.qrtype == 'PHONE')
    {
       return "tel:"+this.phone;
    }
    else if(this.qrtype == 'SMS')
    {
        return "SMSTO:"+this.sms.phone+":"+this.sms.message
    }
    else if(this.qrtype == 'WHATSAPP')
    {
        return "https://api.whatsapp.com/send?phone="+this.whatsapp.phone+"&text=%20"+this.whatsapp.message
    }
    else if(this.qrtype == 'LOCATION')
    {
      if(this.location.lat != undefined && this.location.lat != null && this.location.lang != undefined && this.location.lang != null)
      {
        return "https://maps.google.com/local?q="+this.location.lat+","+ this.location.lang;
      }
       else
       return "https://maps.google.com/local"
    }
  }



  /* loader:boolean = false;

  showLoader()
  {

    this.loader = true;
    const myTimeout = setTimeout(
      function(){
        this.loader = false;
        clearTimeout(myTimeout);
      }, 2500);
  } */




  openDialog(): void {

    var data = {data: this.data, type: this.qrtype};

    if(this.qrtype == 'SERIAL NUMBER')
    {
      data['srno'] = this.serialNumber;
    }

    const dialogRef = this.dialog.open(qrCodeResultComponent, {
      width: '50%',
      data: data
    });

   /*  dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    }); */
  }

  qrCode: any;
  GenerateQRCode()
  {

   
     this.data.data = this.convertQRData();

   
     
     this.openDialog();

    //this.qrCode = new QRCodeStyling(this.data);

    /*
    var canvas = <HTMLElement>document.getElementById("canvas");
    try{
      canvas.innerHTML = '';
    }
    catch(ex){}

    this.qrCode.append(canvas); */

  }

  DownloadQRCode()
  {
    this.qrCode.download({ name: "qr", extension: "png" });
  }

  varifyDisableCondition()
  {
    if(this.qrtype == 'URL')
    {
      if(this.url != undefined && this.url != null && this.url != '')
      {
        return false;
      }
      else
      return true;
    }
    else if(this.qrtype == 'TEXT')
    {
      if(this.text != undefined && this.text != null && this.text != '')
      {
        return false;
      }
      else
      return true;
    }
    else if(this.qrtype == 'CONTACT')
    {
     return false;
    }
    else if(this.qrtype == 'EMAIL')
    {
      if(this.emailForm.email != undefined && this.emailForm.email != null && this.emailForm.email != '' && this.emailForm.subject != undefined && this.emailForm.subject != null && this.emailForm.subject != '' && this.emailForm.message != undefined && this.emailForm.message != null && this.emailForm.message != '')
      {
        return false;
      }
      else
      return true;
    }
    else if(this.qrtype == 'PHONE')
    {
      if(this.phone != undefined && this.phone != null && this.phone != '')
        {
          return false;
        }
        else
        return true;
    }
    else if(this.qrtype == 'SMS')
    {
      if(this.sms.phone != undefined && this.sms.phone != null && this.sms.phone != '' && this.sms.message != undefined && this.sms.message != null && this.sms.message != '')
      {
        return false;
      }
      else
      return true;
    }
    else if(this.qrtype == 'WHATSAPP')
    {
      if(this.whatsapp.phone != undefined && this.whatsapp.phone != null && this.whatsapp.phone != '' && this.whatsapp.message != undefined && this.whatsapp.message != null && this.whatsapp.message != '')
        {
          return false;
        }
        else
        return true;
    }
    else if(this.qrtype == 'LOCATION')
    {
      if(this.location.lat != undefined && this.location.lat != null && this.location.lat != '' && this.location.lang != undefined && this.location.lang != null && this.location.lang != '')
      {
        return false;
      }
       else
       return true;
    }
    else if(this.qrtype == 'SERIAL NUMBER')
    {
      if(this.serialNumber != undefined && this.serialNumber != null && this.serialNumber != '')
      {
        return false;
      }
       else
       return true;
    }
    return true;
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000);
    }

    return value;
  }

}
