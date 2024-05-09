import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorBudgetReqNotifComponent } from './director-budget-req-notif.component';

describe('DirectorBudgetReqNotifComponent', () => {
  let component: DirectorBudgetReqNotifComponent;
  let fixture: ComponentFixture<DirectorBudgetReqNotifComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DirectorBudgetReqNotifComponent]
    });
    fixture = TestBed.createComponent(DirectorBudgetReqNotifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
