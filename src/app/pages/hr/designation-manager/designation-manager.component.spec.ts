import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignationManagerComponent } from './designation-manager.component';

describe('DesignationManagerComponent', () => {
  let component: DesignationManagerComponent;
  let fixture: ComponentFixture<DesignationManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignationManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesignationManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
