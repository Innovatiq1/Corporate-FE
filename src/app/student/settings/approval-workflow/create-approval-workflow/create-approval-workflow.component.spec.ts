import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateApprovalWorkflowComponent } from './create-approval-workflow.component';

describe('CreateApprovalWorkflowComponent', () => {
  let component: CreateApprovalWorkflowComponent;
  let fixture: ComponentFixture<CreateApprovalWorkflowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateApprovalWorkflowComponent]
    });
    fixture = TestBed.createComponent(CreateApprovalWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
