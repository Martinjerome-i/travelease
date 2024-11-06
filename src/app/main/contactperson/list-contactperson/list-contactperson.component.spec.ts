import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListContactpersonComponent } from './list-contactperson.component';

describe('ListContactpersonComponent', () => {
  let component: ListContactpersonComponent;
  let fixture: ComponentFixture<ListContactpersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListContactpersonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListContactpersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
