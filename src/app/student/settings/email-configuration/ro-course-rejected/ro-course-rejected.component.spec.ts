import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoCourseRejectedComponent } from './ro-course-rejected.component';

describe('RoCourseRejectedComponent', () => {
  let component: RoCourseRejectedComponent;
  let fixture: ComponentFixture<RoCourseRejectedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoCourseRejectedComponent]
    });
    fixture = TestBed.createComponent(RoCourseRejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
