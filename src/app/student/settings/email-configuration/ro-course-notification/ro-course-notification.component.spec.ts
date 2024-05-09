import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoCourseNotificationComponent } from './ro-course-notification.component';

describe('RoCourseNotificationComponent', () => {
  let component: RoCourseNotificationComponent;
  let fixture: ComponentFixture<RoCourseNotificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoCourseNotificationComponent]
    });
    fixture = TestBed.createComponent(RoCourseNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
