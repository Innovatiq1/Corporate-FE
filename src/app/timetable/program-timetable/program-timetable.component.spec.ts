import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramTimetableComponent } from './program-timetable.component';

describe('ProgramTimetableComponent', () => {
  let component: ProgramTimetableComponent;
  let fixture: ComponentFixture<ProgramTimetableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgramTimetableComponent]
    });
    fixture = TestBed.createComponent(ProgramTimetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
