import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatagoriesListComponent } from './catagories-list.component';

describe('CatagoriesListComponent', () => {
  let component: CatagoriesListComponent;
  let fixture: ComponentFixture<CatagoriesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatagoriesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatagoriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
