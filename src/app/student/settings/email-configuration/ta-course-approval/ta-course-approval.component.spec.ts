import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaCourseApprovalComponent } from './ta-course-approval.component';

describe('TaCourseApprovalComponent', () => {
  let component: TaCourseApprovalComponent;
  let fixture: ComponentFixture<TaCourseApprovalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaCourseApprovalComponent]
    });
    fixture = TestBed.createComponent(TaCourseApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
