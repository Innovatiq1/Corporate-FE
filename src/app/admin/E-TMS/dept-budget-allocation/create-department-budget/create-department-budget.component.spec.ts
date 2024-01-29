import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDepartmentBudgetComponent } from './create-department-budget.component';

describe('CreateDepartmentBudgetComponent', () => {
  let component: CreateDepartmentBudgetComponent;
  let fixture: ComponentFixture<CreateDepartmentBudgetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateDepartmentBudgetComponent]
    });
    fixture = TestBed.createComponent(CreateDepartmentBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
