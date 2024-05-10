import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptBudgetReqApprovalComponent } from './dept-budget-req-approval.component';

describe('DeptBudgetReqApprovalComponent', () => {
  let component: DeptBudgetReqApprovalComponent;
  let fixture: ComponentFixture<DeptBudgetReqApprovalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeptBudgetReqApprovalComponent]
    });
    fixture = TestBed.createComponent(DeptBudgetReqApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
