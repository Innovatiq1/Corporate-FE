import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizationExamAssessmentRetakeComponent } from './customization-exam-assessment-retake.component';

describe('CustomizationExamAssessmentRetakeComponent', () => {
  let component: CustomizationExamAssessmentRetakeComponent;
  let fixture: ComponentFixture<CustomizationExamAssessmentRetakeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomizationExamAssessmentRetakeComponent]
    });
    fixture = TestBed.createComponent(CustomizationExamAssessmentRetakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
