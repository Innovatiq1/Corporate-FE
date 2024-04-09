import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPendingListComponent } from './student-pending-list.component';

describe('StudentApprovalListComponent', () => {
  let component: StudentPendingListComponent;
  let fixture: ComponentFixture<StudentPendingListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentPendingListComponent]
    });
    fixture = TestBed.createComponent(StudentPendingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
