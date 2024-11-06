import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessOrderentryComponent } from './process-orderentry.component';

describe('ProcessOrderentryComponent', () => {
  let component: ProcessOrderentryComponent;
  let fixture: ComponentFixture<ProcessOrderentryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessOrderentryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProcessOrderentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
