import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MegaPacksDetailsComponent } from './mega-packs-details.component';

describe('MegaPacksDetailsComponent', () => {
  let component: MegaPacksDetailsComponent;
  let fixture: ComponentFixture<MegaPacksDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MegaPacksDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MegaPacksDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
