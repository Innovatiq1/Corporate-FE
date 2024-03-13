import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProgramExamScheduleComponent } from './edit-program-exam-schedule.component';

describe('EditProgramExamScheduleComponent', () => {
  let component: EditProgramExamScheduleComponent;
  let fixture: ComponentFixture<EditProgramExamScheduleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditProgramExamScheduleComponent]
    });
    fixture = TestBed.createComponent(EditProgramExamScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
