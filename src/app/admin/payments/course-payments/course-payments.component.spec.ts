import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursePaymentsComponent } from './course-payments.component';

describe('CoursePaymentsComponent', () => {
  let component: CoursePaymentsComponent;
  let fixture: ComponentFixture<CoursePaymentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursePaymentsComponent]
    });
    fixture = TestBed.createComponent(CoursePaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
