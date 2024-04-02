import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssesmentQuestionsComponent } from './assesment-questions.component';

describe('AssesmentQuestionsComponent', () => {
  let component: AssesmentQuestionsComponent;
  let fixture: ComponentFixture<AssesmentQuestionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssesmentQuestionsComponent]
    });
    fixture = TestBed.createComponent(AssesmentQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
