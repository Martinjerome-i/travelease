import { TestBed } from '@angular/core/testing';

import { ContactpersonService } from './contactperson.service';

describe('ContactpersonService', () => {
  let service: ContactpersonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactpersonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
