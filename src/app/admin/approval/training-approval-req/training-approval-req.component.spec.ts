import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingApprovalReqComponent } from './training-approval-req.component';

describe('TrainingApprovalReqComponent', () => {
  let component: TrainingApprovalReqComponent;
  let fixture: ComponentFixture<TrainingApprovalReqComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrainingApprovalReqComponent]
    });
    fixture = TestBed.createComponent(TrainingApprovalReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
