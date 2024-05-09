import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorCourseRejectedComponent } from './director-course-rejected.component';

describe('DirectorCourseRejectedComponent', () => {
  let component: DirectorCourseRejectedComponent;
  let fixture: ComponentFixture<DirectorCourseRejectedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DirectorCourseRejectedComponent]
    });
    fixture = TestBed.createComponent(DirectorCourseRejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
