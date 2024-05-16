import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewApprovalWorkflowComponent } from './view-approval-workflow.component';

describe('ViewApprovalWorkflowComponent', () => {
  let component: ViewApprovalWorkflowComponent;
  let fixture: ComponentFixture<ViewApprovalWorkflowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewApprovalWorkflowComponent]
    });
    fixture = TestBed.createComponent(ViewApprovalWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
