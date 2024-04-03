import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingApprovalTabComponent } from './training-approval-tab.component';

describe('TrainingApprovalTabComponent', () => {
  let component: TrainingApprovalTabComponent;
  let fixture: ComponentFixture<TrainingApprovalTabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrainingApprovalTabComponent]
    });
    fixture = TestBed.createComponent(TrainingApprovalTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
