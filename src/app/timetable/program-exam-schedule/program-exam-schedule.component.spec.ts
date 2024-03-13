import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramExamScheduleComponent } from './program-exam-schedule.component';

describe('ProgramExamScheduleComponent', () => {
  let component: ProgramExamScheduleComponent;
  let fixture: ComponentFixture<ProgramExamScheduleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgramExamScheduleComponent]
    });
    fixture = TestBed.createComponent(ProgramExamScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
