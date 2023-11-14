import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucessCourseComponent } from './sucess-course.component';

describe('SucessCourseComponent', () => {
  let component: SucessCourseComponent;
  let fixture: ComponentFixture<SucessCourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SucessCourseComponent]
    });
    fixture = TestBed.createComponent(SucessCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
