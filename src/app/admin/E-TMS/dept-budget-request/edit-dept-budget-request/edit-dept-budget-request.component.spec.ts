import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeptBudgetRequestComponent } from './edit-dept-budget-request.component';

describe('EditDeptBudgetRequestComponent', () => {
  let component: EditDeptBudgetRequestComponent;
  let fixture: ComponentFixture<EditDeptBudgetRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditDeptBudgetRequestComponent]
    });
    fixture = TestBed.createComponent(EditDeptBudgetRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
