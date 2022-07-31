import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MegaPacksComponent } from './mega-packs.component';

describe('MegaPacksComponent', () => {
  let component: MegaPacksComponent;
  let fixture: ComponentFixture<MegaPacksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MegaPacksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MegaPacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
