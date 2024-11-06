import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessPaymenttosupplierComponent } from './process-paymenttosupplier.component';

describe('ProcessPaymenttosupplierComponent', () => {
  let component: ProcessPaymenttosupplierComponent;
  let fixture: ComponentFixture<ProcessPaymenttosupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessPaymenttosupplierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProcessPaymenttosupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
