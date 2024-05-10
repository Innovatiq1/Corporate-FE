import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewQuestionsComponent } from './preview-questions.component';

describe('PreviewQuestionsComponent', () => {
  let component: PreviewQuestionsComponent;
  let fixture: ComponentFixture<PreviewQuestionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreviewQuestionsComponent]
    });
    fixture = TestBed.createComponent(PreviewQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
