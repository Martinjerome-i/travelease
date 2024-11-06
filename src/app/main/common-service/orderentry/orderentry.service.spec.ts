import { TestBed } from '@angular/core/testing';

import { OrderentryService } from './orderentry.service';

describe('OrderentryService', () => {
  let service: OrderentryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderentryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
