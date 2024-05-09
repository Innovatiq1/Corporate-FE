import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaCourseNotificationComponent } from './ta-course-notification.component';

describe('TaCourseNotificationComponent', () => {
  let component: TaCourseNotificationComponent;
  let fixture: ComponentFixture<TaCourseNotificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaCourseNotificationComponent]
    });
    fixture = TestBed.createComponent(TaCourseNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
