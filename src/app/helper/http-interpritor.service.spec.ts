import { TestBed } from '@angular/core/testing';

import { HttpInterpritorService } from './http-interpritor.service';

describe('HttpInterpritorService', () => {
  let service: HttpInterpritorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpInterpritorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
