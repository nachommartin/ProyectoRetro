import { TestBed } from '@angular/core/testing';

import { AdminGService } from './admin-g.service';

describe('AdminGService', () => {
  let service: AdminGService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminGService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
