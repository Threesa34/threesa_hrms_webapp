import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductUnitsListComponent } from './product-units-list.component';

describe('ProductUnitsListComponent', () => {
  let component: ProductUnitsListComponent;
  let fixture: ComponentFixture<ProductUnitsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductUnitsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductUnitsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
