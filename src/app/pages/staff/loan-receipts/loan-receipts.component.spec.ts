import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanReceiptsComponent } from './loan-receipts.component';

describe('LoanReceiptsComponent', () => {
  let component: LoanReceiptsComponent;
  let fixture: ComponentFixture<LoanReceiptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanReceiptsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanReceiptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
