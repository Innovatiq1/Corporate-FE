import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoCourseApprovalComponent } from './ro-course-approval.component';

describe('RoCourseApprovalComponent', () => {
  let component: RoCourseApprovalComponent;
  let fixture: ComponentFixture<RoCourseApprovalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoCourseApprovalComponent]
    });
    fixture = TestBed.createComponent(RoCourseApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
