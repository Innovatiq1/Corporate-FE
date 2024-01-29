import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetRequestComponent } from './budget-request.component';

describe('BudgetRequestComponent', () => {
  let component: BudgetRequestComponent;
  let fixture: ComponentFixture<BudgetRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BudgetRequestComponent]
    });
    fixture = TestBed.createComponent(BudgetRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
