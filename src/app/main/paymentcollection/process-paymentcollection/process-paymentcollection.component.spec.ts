import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessPaymentcollectionComponent } from './process-paymentcollection.component';

describe('ProcessPaymentcollectionComponent', () => {
  let component: ProcessPaymentcollectionComponent;
  let fixture: ComponentFixture<ProcessPaymentcollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessPaymentcollectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProcessPaymentcollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
