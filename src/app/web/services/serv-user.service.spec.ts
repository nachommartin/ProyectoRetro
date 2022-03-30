import { TestBed } from '@angular/core/testing';

import { ServUserService } from './serv-user.service';

describe('ServUserService', () => {
  let service: ServUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
