import { TestBed } from '@angular/core/testing';

import { PaymenttosupplierService } from './paymenttosupplier.service';

describe('PaymenttosupplierService', () => {
  let service: PaymenttosupplierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymenttosupplierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
