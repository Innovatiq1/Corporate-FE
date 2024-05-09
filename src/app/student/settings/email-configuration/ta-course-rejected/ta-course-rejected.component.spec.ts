import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaCourseRejectedComponent } from './ta-course-rejected.component';

describe('TaCourseRejectedComponent', () => {
  let component: TaCourseRejectedComponent;
  let fixture: ComponentFixture<TaCourseRejectedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaCourseRejectedComponent]
    });
    fixture = TestBed.createComponent(TaCourseRejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
