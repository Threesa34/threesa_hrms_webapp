import { Component, OnInit, ViewChild } from '@angular/core';
import { EmailEditorComponent } from 'angular-email-editor';
import {Location} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MastersService } from '../../../services/masters.service';
import { environment } from '../../../../environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-news-letters-details',
  templateUrl: './news-letters-details.component.html',
  styleUrls: ['./news-letters-details.component.scss']
})
export class NewsLettersDetailsComponent implements OnInit {

  @ViewChild(EmailEditorComponent)
  private emailEditor: EmailEditorComponent;
  adv_id:number;
  newsLetterDetails:any = {};
  constructor(private _MastersService: MastersService, public _location: Location, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.adv_id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    if(this.adv_id > 0)
    {
      this.getnewsLetterDetails(this.adv_id);
    }
    this.getStatusOptions();
  }


  statusOptions:any;

  getStatusOptions()
  {
    this.statusOptions =  this._MastersService.getStatusOptions(); 
  }

  getnewsLetterDetails(id)
  {
    
      this._MastersService.getnewsLetterDetails(id).subscribe((res:any)=>{
          this.newsLetterDetails = res[0];
      });
    
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

  saveNewsLetter()
  {
    this.emailEditor.saveDesign((design) => {
      this.newsLetterDetails['template'] =  design;
      this.emailEditor.exportHtml((data) => {
        this.newsLetterDetails['htmlTemplate'] = data;
        this._MastersService.saveNewsLetter(this.newsLetterDetails).subscribe((res: any) => {
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
      });
    });
  }

  saveDesign() {
    this.emailEditor.saveDesign((design) => console.log('saveDesign', design));
  }

  exportHtml() {
    this.emailEditor.exportHtml((data) => console.log('exportHtml', data));
  }

}
