import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackReportComponent } from './feedback-report.component';

describe('FeedbackReportComponent', () => {
  let component: FeedbackReportComponent;
  let fixture: ComponentFixture<FeedbackReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeedbackReportComponent]
    });
    fixture = TestBed.createComponent(FeedbackReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
