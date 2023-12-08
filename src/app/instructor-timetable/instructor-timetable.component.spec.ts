import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorTimetableComponent } from './instructor-timetable.component';

describe('InstructorTimetableComponent', () => {
  let component: InstructorTimetableComponent;
  let fixture: ComponentFixture<InstructorTimetableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstructorTimetableComponent]
    });
    fixture = TestBed.createComponent(InstructorTimetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
