import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProgramExamScheduleComponent } from './create-program-exam-schedule.component';

describe('CreateProgramExamScheduleComponent', () => {
  let component: CreateProgramExamScheduleComponent;
  let fixture: ComponentFixture<CreateProgramExamScheduleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateProgramExamScheduleComponent]
    });
    fixture = TestBed.createComponent(CreateProgramExamScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
