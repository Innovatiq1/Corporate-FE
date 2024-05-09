import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptBudgetReqRejectedComponent } from './dept-budget-req-rejected.component';

describe('DeptBudgetReqRejectedComponent', () => {
  let component: DeptBudgetReqRejectedComponent;
  let fixture: ComponentFixture<DeptBudgetReqRejectedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeptBudgetReqRejectedComponent]
    });
    fixture = TestBed.createComponent(DeptBudgetReqRejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
