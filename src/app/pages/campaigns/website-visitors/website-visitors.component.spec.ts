import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteVisitorsComponent } from './website-visitors.component';

describe('WebsiteVisitorsComponent', () => {
  let component: WebsiteVisitorsComponent;
  let fixture: ComponentFixture<WebsiteVisitorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsiteVisitorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteVisitorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
