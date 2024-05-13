import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDeptBudgetComponent } from './view-dept-budget.component';

describe('ViewDeptBudgetComponent', () => {
  let component: ViewDeptBudgetComponent;
  let fixture: ComponentFixture<ViewDeptBudgetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewDeptBudgetComponent]
    });
    fixture = TestBed.createComponent(ViewDeptBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
