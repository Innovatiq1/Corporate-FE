import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCoursePaymentComponent } from './view-course-payment.component';

describe('ViewCoursePaymentComponent', () => {
  let component: ViewCoursePaymentComponent;
  let fixture: ComponentFixture<ViewCoursePaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewCoursePaymentComponent]
    });
    fixture = TestBed.createComponent(ViewCoursePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
