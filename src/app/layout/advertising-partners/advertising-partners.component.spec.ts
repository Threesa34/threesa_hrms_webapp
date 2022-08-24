import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisingPartnersComponent } from './advertising-partners.component';

describe('AdvertisingPartnersComponent', () => {
  let component: AdvertisingPartnersComponent;
  let fixture: ComponentFixture<AdvertisingPartnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertisingPartnersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvertisingPartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
