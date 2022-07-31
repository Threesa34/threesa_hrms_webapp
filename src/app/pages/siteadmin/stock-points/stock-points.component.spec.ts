import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockPointsComponent } from './stock-points.component';

describe('StockPointsComponent', () => {
  let component: StockPointsComponent;
  let fixture: ComponentFixture<StockPointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockPointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
