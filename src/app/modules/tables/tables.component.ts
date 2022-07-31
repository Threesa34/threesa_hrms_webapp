import { Component, OnInit, ViewChild, NgZone, Inject, ElementRef, Input, AfterViewInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  
  searchContact:any;
  pageLimit:any;
  listLimit:any;
  startFrom:any;
  jumpedPage:any;
  tableColumns:any;
  @Input() tableHeaders: any;
  @Input() tableData: any;
  @Input() dataSize: any;
  
  pageSize:any = [{title:'10', value:10}, {title:'25', value:25}, {title:'50', value:50}, {title:'100', value:100}]
  @Output() rowSelectionEventEmit = new EventEmitter<any>();
  @Output() eventEmitPageRecord = new EventEmitter<any>();

  
  cloanedTbaleHeaders:any;
  _tableHeaders:any;
  clonaeddata:any;
  _tableData:any;
  tableHeight:any;
  constructor() {}

   ngOnInit(): void {

    
    this._tableData = Object.assign([], this.tableData);
    this.clonaeddata = Object.assign([], this.tableData);
    this.cloanedTbaleHeaders = Object.assign([], this.tableHeaders);
    this._tableHeaders = Object.assign([], this.tableHeaders);
    this.pageLimit = '10';
    this.startFrom = 0;
    this.pageSize.push({title:'All', value:this.tableData.length})
    this.getTotagePages();
  
  }





  orderDesc:boolean = false;
  orderAsc:boolean = false;
  
   sortCounter:number = 0;
   clickedIndex:number;
  RecordOrderedBy(recordObj, index)
  {
    this.clickedIndex = index;
      if(this.sortCounter == 0)
      {
       
        this.orderAsc = true;
        this._tableData = this.tableData.sort((a,b) =>  (a[recordObj.field] > b[recordObj.field] ? 1 : -1));
        this.sortCounter = this.sortCounter +1
      }
      else if(this.sortCounter == 1)
      {
       
        this.orderAsc = false;
        this.orderDesc = true;
        this._tableData = this.tableData.sort((a,b) =>  (a[recordObj.field] > b[recordObj.field] ? -1 : 1));
        this.sortCounter = this.sortCounter +1
      }
      else
      {
       
        this.orderAsc = false;
        this.orderDesc = false;
        this._tableData = this.clonaeddata;
        this.sortCounter = 0;
      }
  }

  NumOfPages:number;
  selectedPage:number;
  getTotagePages()
  {
    var totalPages = Number(this.dataSize) / parseInt(this.pageLimit);
    this.listLimit = 0;
    this.startFrom = 0;
    this.jumpedPage = undefined;
    this.listLimit =  parseInt(this.pageLimit) + parseInt(this.startFrom);
    this.NumOfPages = Math.ceil(totalPages);
    this.selectedPage = Number(this.startFrom) + 1;
    
    this.tableHeight = this.getScreenHeight(this.listLimit);

  }


  previousPage()
  {
    this.jumpedPage = !this.jumpedPage;
    this.selectedPage = this.selectedPage - 1;
    this.startFrom =  (Number(this.selectedPage) - 1) * parseInt(this.pageLimit);
    this.listLimit =  parseInt(this.pageLimit) + parseInt(this.startFrom);
    this.emitPageRecordEvent();
  }
  nextPage()
  {
    this.jumpedPage = !this.jumpedPage;
    this.selectedPage = this.selectedPage + 1;
    this.startFrom =  String((Number(this.selectedPage) - 1) * parseInt(this.pageLimit));
    this.listLimit =  parseInt(this.pageLimit) + parseInt(this.startFrom);
    this.emitPageRecordEvent();
  }

  JumpedToPage(page)
  {
    if(page != undefined && page != null && !isNaN(page))
    {
      this.selectedPage = page;
      this.startFrom =  String((Number(this.selectedPage) - 1) * parseInt(this.pageLimit));
      this.listLimit =  parseInt(this.pageLimit) + parseInt(this.startFrom);
      this.emitPageRecordEvent();
    }
    else
    {
      this.selectedPage = 1;
      this.startFrom =  String((Number(this.selectedPage) - 1) * parseInt(this.pageLimit));
      this.listLimit =  parseInt(this.pageLimit) + parseInt(this.startFrom);
      this.emitPageRecordEvent();
    }
  }

  getScreenHeight(value)
  {
    var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;

    console.log(y);

      var result = (100*(y/1.4))/y;
      console.log(result)
      return result+'vh';
    
  }

jumpTuFirstPage()
  {
    this.jumpedPage = undefined;
    this.selectedPage = 1;
    this.startFrom =  (Number(this.selectedPage) - 1) * parseInt(this.pageLimit);
    this.listLimit =  parseInt(this.pageLimit) + parseInt(this.startFrom);

    this.emitPageRecordEvent();
  }

  jumpToLastPage()
  {
    this.jumpedPage = undefined;
    this.selectedPage = this.NumOfPages;
    this.startFrom =  String((Number(this.selectedPage) - 1) * parseInt(this.pageLimit));
    this.listLimit =  parseInt(this.pageLimit) + parseInt(this.startFrom);
    this.emitPageRecordEvent();
  }

  rowSeleted:any[] = [];

  selectItem(event, data)
  {
    if(event.checked == true)
    {
        this.rowSeleted.push(data)
    }
    else
    {
      this.rowSeleted.splice(this.rowSeleted.indexOf(data), 1);
    }
    this.selectedRowsData();
  }

  selectAllItem(event)
  {
    
    if(event.checked == true)
    {
        this.rowSeleted = this.tableData;
    }
    else
    {
      this.rowSeleted = [];
    }
    this.selectedRowsData();
  }

  checkRowExist(data)
  {
      return this.rowSeleted.indexOf(data) >= 0;
  }

  selectedRowsData()
  {
      this.rowSelectionEventEmit.emit(this.rowSeleted)
  }

  emitPageRecordEvent()
  {
    this.eventEmitPageRecord.emit({startFrom: this.startFrom, limitTo:this.listLimit});
  }

  toggleTableColumns()
  {
     if(this.tableColumns != undefined && this.tableColumns.length > 0)
     {
          this._tableHeaders = this.tableColumns;
     }
     else
     {
        this._tableHeaders = this.cloanedTbaleHeaders;
     }
  }
  

}
