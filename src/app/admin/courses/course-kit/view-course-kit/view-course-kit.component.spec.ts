import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCourseKitComponent } from './view-course-kit.component';

describe('ViewCourseKitComponent', () => {
  let component: ViewCourseKitComponent;
  let fixture: ComponentFixture<ViewCourseKitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewCourseKitComponent]
    });
    fixture = TestBed.createComponent(ViewCourseKitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
