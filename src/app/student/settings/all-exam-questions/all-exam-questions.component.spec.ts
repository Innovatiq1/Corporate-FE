import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllExamQuestionsComponent } from './all-exam-questions.component';

describe('AllExamQuestionsComponent', () => {
  let component: AllExamQuestionsComponent;
  let fixture: ComponentFixture<AllExamQuestionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllExamQuestionsComponent]
    });
    fixture = TestBed.createComponent(AllExamQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
