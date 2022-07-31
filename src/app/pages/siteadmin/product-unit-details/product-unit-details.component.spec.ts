import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductUnitDetailsComponent } from './product-unit-details.component';

describe('ProductUnitDetailsComponent', () => {
  let component: ProductUnitDetailsComponent;
  let fixture: ComponentFixture<ProductUnitDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductUnitDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductUnitDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
