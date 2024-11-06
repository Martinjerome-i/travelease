import { TestBed } from '@angular/core/testing';

import { ServiceChoiceService } from './service-choice.service';

describe('ServiceChoiceService', () => {
  let service: ServiceChoiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceChoiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
