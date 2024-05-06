import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDbComponent } from './student-db.component';

describe('StudentDbComponent', () => {
  let component: StudentDbComponent;
  let fixture: ComponentFixture<StudentDbComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentDbComponent]
    });
    fixture = TestBed.createComponent(StudentDbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
