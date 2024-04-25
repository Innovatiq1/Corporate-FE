import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizationAssessmentRetakeComponent } from './customization-assessment-retake.component';

describe('CustomizationAssessmentRetakeComponent', () => {
  let component: CustomizationAssessmentRetakeComponent;
  let fixture: ComponentFixture<CustomizationAssessmentRetakeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomizationAssessmentRetakeComponent]
    });
    fixture = TestBed.createComponent(CustomizationAssessmentRetakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
