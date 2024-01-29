import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallBudgetListComponent } from './overall-budget-list.component';

describe('OverallBudgetListComponent', () => {
  let component: OverallBudgetListComponent;
  let fixture: ComponentFixture<OverallBudgetListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OverallBudgetListComponent]
    });
    fixture = TestBed.createComponent(OverallBudgetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
