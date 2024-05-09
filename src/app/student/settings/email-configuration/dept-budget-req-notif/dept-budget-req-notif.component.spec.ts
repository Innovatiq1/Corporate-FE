import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptBudgetReqNotifComponent } from './dept-budget-req-notif.component';

describe('DeptBudgetReqNotifComponent', () => {
  let component: DeptBudgetReqNotifComponent;
  let fixture: ComponentFixture<DeptBudgetReqNotifComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeptBudgetReqNotifComponent]
    });
    fixture = TestBed.createComponent(DeptBudgetReqNotifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
