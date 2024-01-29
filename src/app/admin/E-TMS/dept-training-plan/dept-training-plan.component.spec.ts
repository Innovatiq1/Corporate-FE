import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptTrainingPlanComponent } from './dept-training-plan.component';

describe('DeptTrainingPlanComponent', () => {
  let component: DeptTrainingPlanComponent;
  let fixture: ComponentFixture<DeptTrainingPlanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeptTrainingPlanComponent]
    });
    fixture = TestBed.createComponent(DeptTrainingPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
