import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessContactpersonComponent } from './process-contactperson.component';

describe('ProcessContactpersonComponent', () => {
  let component: ProcessContactpersonComponent;
  let fixture: ComponentFixture<ProcessContactpersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessContactpersonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProcessContactpersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
