import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { EmailEditorComponent } from 'angular-email-editor';
import {Location} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MastersService } from '../../../services/masters.service';
import { environment } from '../../../../environments/environment';
import Swal from 'sweetalert2';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {  FileUploader } from 'ng2-file-upload';
import * as XLSX from 'xlsx';
import { HttpUrlEncodingCodec } from '@angular/common/http';



@Component({
  selector: 'share-on-email',
  templateUrl: './sub_modules/share-on-email.html',
  styleUrls: ['./news-letters-campaign.component.scss']
})
export class shareOnEmail implements OnInit{

  
  
  constructor(private _MastersService : MastersService, @Inject(MAT_DIALOG_DATA) public data: any) {}


  sheets:any = [];
  uploadData :any = {};
  
  public uploader: FileUploader = new FileUploader({
    isHTML5: true
  });

  templateDetails:any ={};
  advDetails:any ={};
 jsonData:any;
  showfileUploader:boolean;
  selectedSheet:any;
  rowArr:any = [{},{},{}];
  membersList:any=[];

  ngOnInit(): void {
    this.templateDetails = this.data;
  }

 
  addNewMember()
  {
    if(this.membersList.length > 0 && this.membersList[this.membersList.length - 1] != '' && this.membersList[this.membersList.length - 1] != undefined && this.membersList[this.membersList.length - 1] != null)
    {
      this.membersList.push({email:''})
    }
    else{
      this.membersList.push({email:''})
    }

  }

  spliceMember(index)
  {
    this.membersList.splice(index, 1);
  }


  onFileChange(ev) {
    let workBook = null;
    
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      this.jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
       
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        console.log(initial)
        return initial;
      }, {});
    this.sheets = Object.keys(this.jsonData);
    console.log(this.sheets)
    }
    reader.readAsBinaryString(file);
  }

  contactNos:any;
  getDatafromSheet(sheetname)
  {
    this.contactNos = this.jsonData[sheetname];
  }
  

  uploadExcelData()
  {
    this.contactNos.map((value)=>{
      this.membersList.push({email: value.email})
    })
  }

  shareOnEmail()
  {
     var contactsList = '';
     this.membersList.map((value)=>{
       if(value.email != undefined && value.email != null && value.email != '')
        contactsList = contactsList+value.email+',';
     });

     contactsList = contactsList.substring(0,contactsList.length - 1);

     var payload = {contacts:contactsList, adv_id:this.data,subject: this.advDetails.subject};

     this._MastersService.shareOnEmail(payload).subscribe((res: any) => {
      var resAlert ={
        title: res.title,
        text: res.message,
        type: res.type,
      }
       Swal.fire(resAlert).then((result) => {
        if (res.status === 1) {
        
        } else {
        }
      }); 
     });
  }

  

 formatFullName(text)
  {
    var formatedtext = '';
    formatedtext = formatedtext + text;
    if(formatedtext.trim().charAt(formatedtext.length -1) == '.')
      return formatedtext;
      else
      return formatedtext+'.';
  }

}

@Component({
  selector: 'share-on-message',
  templateUrl: './sub_modules/share-on-message.html',
  styleUrls: ['./news-letters-campaign.component.scss']
})
export class shareOnmessage implements OnInit{

  constructor(private _MastersService : MastersService, @Inject(MAT_DIALOG_DATA) public data: any) {}


  sheets:any = [];
  uploadData :any = {};
  
  public uploader: FileUploader = new FileUploader({
    isHTML5: true
  });

  templateDetails:any ={};
  advDetails:any ={};
 jsonData:any;
  showfileUploader:boolean;
  selectedSheet:any;
  rowArr:any = [{},{},{}];
  membersList:any=[];

  ngOnInit(): void {
    this.templateDetails = this.data;
  }


  
  addNewMember()
  {
    if(this.membersList.length > 0 && this.membersList[this.membersList.length - 1] != '' && this.membersList[this.membersList.length - 1] != undefined && this.membersList[this.membersList.length - 1] != null)
    {
      this.membersList.push({number:''})
    }
    else{
      this.membersList.push({number:''})
    }

  }

  spliceMember(index)
  {
    this.membersList.splice(index, 1);
  }


  onFileChange(ev) {
    let workBook = null;
    
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      this.jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
       
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        console.log(initial)
        return initial;
      }, {});
    this.sheets = Object.keys(this.jsonData);
    console.log(this.sheets)
    }
    reader.readAsBinaryString(file);
  }

  contactNos:any;
  getDatafromSheet(sheetname)
  {
    this.contactNos = this.jsonData[sheetname];
  }
  

  uploadExcelData()
  {
    this.contactNos.map((value)=>{
      this.membersList.push({number:value.mobile_no})
    })
  }

  shareOnMessage()
  {
     var contactsList = '';
     this.membersList.map((value)=>{
      if(value.number != undefined && value.number != null && value.number != '')
      contactsList = contactsList+value.number+',';
     });

     contactsList = contactsList.substring(0,contactsList.length - 1);

     var payload = {contacts:contactsList, adv_id:this.data, senderid:this.advDetails.senderid};

     this._MastersService.shareOnMessage(payload).subscribe((res: any) => {
      var resAlert ={
        title: res.title,
        text: res.message,
        type: res.type,
      }
       Swal.fire(resAlert).then((result) => {
        if (res.status === 1) {
             
        } else {
        }
      }); 
     });
  }

 formatFullName(text)
  {
    var formatedtext = '';
    formatedtext = formatedtext + text;
    if(formatedtext.trim().charAt(formatedtext.length -1) == '.')
      return formatedtext;
      else
      return formatedtext+'.';
  }

}

@Component({
  selector: 'app-news-letters-campaign',
  templateUrl: './news-letters-campaign.component.html',
  styleUrls: ['./news-letters-campaign.component.scss']
})
export class NewsLettersCampaignComponent implements OnInit {


  codec = new HttpUrlEncodingCodec;

  adv_id:number;
  htmlTemplate:any='';
  newsLetterDetails:any = {};
  @ViewChild(EmailEditorComponent)
  private emailEditor: EmailEditorComponent;
  constructor(private _MastersService: MastersService, public _location: Location, private activatedRoute: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.adv_id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    if(this.adv_id > 0)
    {
      this.getnewsLetterDetails(this.adv_id);
      this.loadHtml(this.adv_id);
    }
  }

  ngEncode(param: string){
    return this.codec.encodeValue(param);
  }
  
  getnewsLetterDetails(id)
  {
    
      this._MastersService.getnewsLetterDetails(id).subscribe((res:any)=>{
          this.newsLetterDetails = res[0];
      });
    
  }


shareOnWhatsApp()
{
  var url = 'https://web.whatsapp.com/send?text=';
 
  url = url+this.newsLetterDetails.description;

  /* if(this.newsLetterDetails.whatsapp_no != undefined && this.newsLetterDetails.whatsapp_no != null && this.newsLetterDetails.whatsapp_no != '')
  {
      var str = "https://wa.me/"+this.newsLetterDetails.whatsapp_no+"?text="
      if(this.newsLetterDetails.whatsapp_msg != undefined && this.newsLetterDetails.whatsapp_msg != null && this.newsLetterDetails.whatsapp_msg != '')
      {
          str = str+ (this.newsLetterDetails.whatsapp_msg).replace(/ /g, "%20").replace(/\s+ /g, "%20");

          str = this.ngEncode(str)
      }

      var whatsappLink = '%0ALink for whatsapp chat:%0A'+ str;
  }
else
{
  var whatsappLink = '';
} */ 

  if(this.newsLetterDetails.shorten_url != undefined && this.newsLetterDetails.shorten_url != null && this.newsLetterDetails.shorten_url != '')
  {
    url = url+'%0AClick the link below:%0A'+this.newsLetterDetails.shorten_url;
  }
  url = url; // + whatsappLink;

  window.open(url,'_blank'); 
}



sendAdvertisementEmail()
{
  
}



  editorLoaded(event) {
    if(this.adv_id > 0)
    {
      this._MastersService.getnewsLetterJsonTemplate(this.adv_id).subscribe((res:any)=>{
        const json = JSON.parse(res.data);
        this.emailEditor.loadDesign(json);
    });
    
    }
  }

  loadHtml(id) {
      this._MastersService.getnewsLetterHtmlTemplate(id).subscribe((res:any)=>{
          this.htmlTemplate = res.data;
    });
  }


  openSmsDialog(){  
    var dialogRef = this.dialog.open(shareOnmessage,{width: '50%',data:this.adv_id});
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  
   openEmailDialog(){  
    var dialogRef = this.dialog.open(shareOnEmail,{width: '50%',data:this.adv_id});
    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
