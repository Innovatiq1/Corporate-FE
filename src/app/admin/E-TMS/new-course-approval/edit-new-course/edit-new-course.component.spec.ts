import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNewCourseComponent } from './edit-new-course.component';

describe('EditNewCourseComponent', () => {
  let component: EditNewCourseComponent;
  let fixture: ComponentFixture<EditNewCourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditNewCourseComponent]
    });
    fixture = TestBed.createComponent(EditNewCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
