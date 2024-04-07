import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExamQuestionsComponent } from './add-exam-questions.component';

describe('AddExamQuestionsComponent', () => {
  let component: AddExamQuestionsComponent;
  let fixture: ComponentFixture<AddExamQuestionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddExamQuestionsComponent]
    });
    fixture = TestBed.createComponent(AddExamQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
