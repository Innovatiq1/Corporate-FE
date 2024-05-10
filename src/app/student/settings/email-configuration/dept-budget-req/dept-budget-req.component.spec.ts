import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptBudgetReqComponent } from './dept-budget-req.component';

describe('DeptBudgetReqComponent', () => {
  let component: DeptBudgetReqComponent;
  let fixture: ComponentFixture<DeptBudgetReqComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeptBudgetReqComponent]
    });
    fixture = TestBed.createComponent(DeptBudgetReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
