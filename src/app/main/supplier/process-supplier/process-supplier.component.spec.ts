import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessSupplierComponent } from './process-supplier.component';

describe('ProcessSupplierComponent', () => {
  let component: ProcessSupplierComponent;
  let fixture: ComponentFixture<ProcessSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessSupplierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProcessSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
