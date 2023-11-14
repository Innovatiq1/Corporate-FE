import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailureCourseComponent } from './failure-course.component';

describe('FailureCourseComponent', () => {
  let component: FailureCourseComponent;
  let fixture: ComponentFixture<FailureCourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FailureCourseComponent]
    });
    fixture = TestBed.createComponent(FailureCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
