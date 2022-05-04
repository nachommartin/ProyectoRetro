import { TestBed } from '@angular/core/testing';

import { AdminJuegoService } from './admin-juego.service';

describe('AdminJuegoService', () => {
  let service: AdminJuegoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminJuegoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
