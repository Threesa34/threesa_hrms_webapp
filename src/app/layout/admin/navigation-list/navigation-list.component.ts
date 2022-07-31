import { Component, Input, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MenuItems } from '../../../shared/menu-items/menu-items';
import { PerfectScrollbarConfigInterface,
  PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
@Component({
  selector: 'app-navigation-list',
  templateUrl: './navigation-list.component.html',
  styleUrls: ['./navigation-list.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({transform: 'rotate(0deg)'})),
      state('expanded', style({transform: 'rotate(180deg)'})),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class NavigationListComponent implements OnInit {
  expanded: boolean = false;
  @Input() item:any;
  public config: PerfectScrollbarConfigInterface = {};

  selectedMenuHistory:any = new MenuItems().getAll()[0].main;

  constructor(public router: Router) { }

  ngOnInit(): void {
  }


  toggleSubMenu(_obj)
  {
   
     if (!_obj.children || !_obj.children.length) {
      this.router.navigate([_obj.route]);

    }
    if (_obj.children && _obj.children.length) {
      this.expanded = !this.expanded;
    } 
  }
  

}
