import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessCustomerComponent } from './process-customer.component';

describe('ProcessCustomerComponent', () => {
  let component: ProcessCustomerComponent;
  let fixture: ComponentFixture<ProcessCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessCustomerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProcessCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
