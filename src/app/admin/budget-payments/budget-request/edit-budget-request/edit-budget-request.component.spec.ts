import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBudgetRequestComponent } from './edit-budget-request.component';

describe('EditBudgetRequestComponent', () => {
  let component: EditBudgetRequestComponent;
  let fixture: ComponentFixture<EditBudgetRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditBudgetRequestComponent]
    });
    fixture = TestBed.createComponent(EditBudgetRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
