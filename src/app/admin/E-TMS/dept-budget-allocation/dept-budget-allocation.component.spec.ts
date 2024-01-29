import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptBudgetAllocationComponent } from './dept-budget-allocation.component';

describe('DeptBudgetAllocationComponent', () => {
  let component: DeptBudgetAllocationComponent;
  let fixture: ComponentFixture<DeptBudgetAllocationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeptBudgetAllocationComponent]
    });
    fixture = TestBed.createComponent(DeptBudgetAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
