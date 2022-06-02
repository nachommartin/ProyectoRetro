import { TestBed } from '@angular/core/testing';

import { NotbangService } from './notbang.service';

describe('NotbangService', () => {
  let service: NotbangService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotbangService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
