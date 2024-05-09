import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorCourseApprovalComponent } from './director-course-approval.component';

describe('DirectorCourseApprovalComponent', () => {
  let component: DirectorCourseApprovalComponent;
  let fixture: ComponentFixture<DirectorCourseApprovalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DirectorCourseApprovalComponent]
    });
    fixture = TestBed.createComponent(DirectorCourseApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
