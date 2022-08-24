import { Component, OnInit, Inject } from '@angular/core';
import { MastersService } from '../../../../services/masters.service';
import { environment } from '../../../../../environments/environment';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.scss']
})
export class PersonDetailsComponent implements OnInit {

  personDetails:any = {};

  constructor(private _MastersService: MastersService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if(this.data != undefined && this.data != null && this.data != '')
    {
      this.personDetails = this.data[0];
      
    }
  }

  

  savePartnerDetails()
  {
    
    this._MastersService.savePartnerDetails(this.personDetails).subscribe((res: any) => {
      var resAlert ={
        title: res.title,
        text: res.message,
        type: res.type,
      }
       Swal.fire(resAlert).then((result) => {
        if (res.status === 1) {
          this._MastersService.EmitPartnersList();
        } else {
        }
      }); 
    });
  } 


}
