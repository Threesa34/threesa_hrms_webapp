import { TestBed } from '@angular/core/testing';

import { SiteadminService } from './siteadmin.service';

describe('SiteadminService', () => {
  let service: SiteadminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SiteadminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
