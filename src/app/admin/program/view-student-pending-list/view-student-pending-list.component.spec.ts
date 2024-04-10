import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStudentPendingListComponent } from './view-student-pending-list.component';

describe('ViewStudentPendingListComponent', () => {
  let component: ViewStudentPendingListComponent;
  let fixture: ComponentFixture<ViewStudentPendingListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewStudentPendingListComponent]
    });
    fixture = TestBed.createComponent(ViewStudentPendingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
