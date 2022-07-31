import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsLettersDetailsComponent } from './news-letters-details.component';

describe('NewsLettersDetailsComponent', () => {
  let component: NewsLettersDetailsComponent;
  let fixture: ComponentFixture<NewsLettersDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsLettersDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsLettersDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
