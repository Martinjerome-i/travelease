import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPaymenttosupplierComponent } from './list-paymenttosupplier.component';

describe('ListPaymenttosupplierComponent', () => {
  let component: ListPaymenttosupplierComponent;
  let fixture: ComponentFixture<ListPaymenttosupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPaymenttosupplierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListPaymenttosupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
