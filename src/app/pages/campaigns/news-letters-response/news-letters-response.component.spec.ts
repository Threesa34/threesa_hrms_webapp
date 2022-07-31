import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsLettersResponseComponent } from './news-letters-response.component';

describe('NewsLettersResponseComponent', () => {
  let component: NewsLettersResponseComponent;
  let fixture: ComponentFixture<NewsLettersResponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsLettersResponseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsLettersResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
