import { TestBed } from '@angular/core/testing';

import { PaymentcollectionService } from './paymentcollection.service';

describe('PaymentcollectionService', () => {
  let service: PaymentcollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentcollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
