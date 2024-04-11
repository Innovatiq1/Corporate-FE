import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackCommonComponent } from './feedbackCommon.component';

describe('FeedbackCommonComponent', () => {
  let component: FeedbackCommonComponent;
  let fixture: ComponentFixture<FeedbackCommonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeedbackCommonComponent]
    });
    fixture = TestBed.createComponent(FeedbackCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
