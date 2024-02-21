import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorCourseNotificationComponent } from './director-course-notification.component';

describe('NewStudentReferredComponent', () => {
  let component: DirectorCourseNotificationComponent;
  let fixture: ComponentFixture<DirectorCourseNotificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DirectorCourseNotificationComponent]
    });
    fixture = TestBed.createComponent(DirectorCourseNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
