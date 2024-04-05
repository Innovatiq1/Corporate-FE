import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCourseScheduleComponent } from './view-course-schedule.component';

describe('ViewCourseScheduleComponent', () => {
  let component: ViewCourseScheduleComponent;
  let fixture: ComponentFixture<ViewCourseScheduleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewCourseScheduleComponent]
    });
    fixture = TestBed.createComponent(ViewCourseScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
