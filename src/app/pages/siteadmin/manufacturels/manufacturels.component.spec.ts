import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturelsComponent } from './manufacturels.component';

describe('ManufacturelsComponent', () => {
  let component: ManufacturelsComponent;
  let fixture: ComponentFixture<ManufacturelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManufacturelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufacturelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
