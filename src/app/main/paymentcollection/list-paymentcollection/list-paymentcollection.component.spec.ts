import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPaymentcollectionComponent } from './list-paymentcollection.component';

describe('ListPaymentcollectionComponent', () => {
  let component: ListPaymentcollectionComponent;
  let fixture: ComponentFixture<ListPaymentcollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPaymentcollectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListPaymentcollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
