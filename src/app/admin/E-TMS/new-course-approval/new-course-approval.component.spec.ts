import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCourseApprovalComponent } from './new-course-approval.component';

describe('NewCourseApprovalComponent', () => {
  let component: NewCourseApprovalComponent;
  let fixture: ComponentFixture<NewCourseApprovalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewCourseApprovalComponent]
    });
    fixture = TestBed.createComponent(NewCourseApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
