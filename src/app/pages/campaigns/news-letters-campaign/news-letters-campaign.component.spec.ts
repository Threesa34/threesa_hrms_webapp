import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsLettersCampaignComponent } from './news-letters-campaign.component';

describe('NewsLettersCampaignComponent', () => {
  let component: NewsLettersCampaignComponent;
  let fixture: ComponentFixture<NewsLettersCampaignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsLettersCampaignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsLettersCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
