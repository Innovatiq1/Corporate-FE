import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamsSheduleComponent } from './exams-shedule.component';

describe('ExamsSheduleComponent', () => {
  let component: ExamsSheduleComponent;
  let fixture: ComponentFixture<ExamsSheduleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExamsSheduleComponent]
    });
    fixture = TestBed.createComponent(ExamsSheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
