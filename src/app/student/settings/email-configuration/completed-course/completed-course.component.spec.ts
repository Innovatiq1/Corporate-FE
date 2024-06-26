import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedCourseComponent } from './completed-course.component';

describe('CompletedCourseComponent', () => {
  let component: CompletedCourseComponent;
  let fixture: ComponentFixture<CompletedCourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompletedCourseComponent]
    });
    fixture = TestBed.createComponent(CompletedCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
