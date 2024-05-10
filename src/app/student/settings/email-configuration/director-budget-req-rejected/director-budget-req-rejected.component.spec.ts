import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorBudgetReqRejectedComponent } from './director-budget-req-rejected.component';

describe('DirectorBudgetReqRejectedComponent', () => {
  let component: DirectorBudgetReqRejectedComponent;
  let fixture: ComponentFixture<DirectorBudgetReqRejectedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DirectorBudgetReqRejectedComponent]
    });
    fixture = TestBed.createComponent(DirectorBudgetReqRejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
