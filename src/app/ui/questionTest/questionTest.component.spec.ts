import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionTestComponent } from './questionTest.component';

describe('QuestionTestComponent', () => {
  let component: QuestionTestComponent;
  let fixture: ComponentFixture<QuestionTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionTestComponent]
    });
    fixture = TestBed.createComponent(QuestionTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
