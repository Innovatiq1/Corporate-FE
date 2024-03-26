import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDeptBudgetRequestComponent } from './create-dept-budget-request.component';

describe('CreateDeptBudgetRequestComponent', () => {
  let component: CreateDeptBudgetRequestComponent;
  let fixture: ComponentFixture<CreateDeptBudgetRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateDeptBudgetRequestComponent]
    });
    fixture = TestBed.createComponent(CreateDeptBudgetRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
