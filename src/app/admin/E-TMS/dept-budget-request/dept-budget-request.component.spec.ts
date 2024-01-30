import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptBudgetRequestComponent } from './dept-budget-request.component';

describe('DeptBudgetRequestComponent', () => {
  let component: DeptBudgetRequestComponent;
  let fixture: ComponentFixture<DeptBudgetRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeptBudgetRequestComponent]
    });
    fixture = TestBed.createComponent(DeptBudgetRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
