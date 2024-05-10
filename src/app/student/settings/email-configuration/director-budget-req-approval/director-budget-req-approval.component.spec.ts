import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorBudgetReqApprovalComponent } from './director-budget-req-approval.component';

describe('DirectorBudgetReqApprovalComponent', () => {
  let component: DirectorBudgetReqApprovalComponent;
  let fixture: ComponentFixture<DirectorBudgetReqApprovalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DirectorBudgetReqApprovalComponent]
    });
    fixture = TestBed.createComponent(DirectorBudgetReqApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
