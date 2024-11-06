import { TestBed } from '@angular/core/testing';

import { VisaServiceService } from './visa-service.service';

describe('VisaServiceService', () => {
  let service: VisaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
