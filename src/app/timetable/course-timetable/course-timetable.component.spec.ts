import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseTimetableComponent } from './course-timetable.component';

describe('CourseTimetableComponent', () => {
  let component: CourseTimetableComponent;
  let fixture: ComponentFixture<CourseTimetableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseTimetableComponent]
    });
    fixture = TestBed.createComponent(CourseTimetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
