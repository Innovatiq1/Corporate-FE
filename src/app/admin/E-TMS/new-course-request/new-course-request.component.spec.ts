import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCourseRequestComponent } from './new-course-request.component';

describe('NewCourseRequestComponent', () => {
  let component: NewCourseRequestComponent;
  let fixture: ComponentFixture<NewCourseRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewCourseRequestComponent]
    });
    fixture = TestBed.createComponent(NewCourseRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
