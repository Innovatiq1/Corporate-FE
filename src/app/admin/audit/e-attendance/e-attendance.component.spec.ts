import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EAttendanceComponent } from './e-attendance.component';

describe('EAttendanceComponent', () => {
  let component: EAttendanceComponent;
  let fixture: ComponentFixture<EAttendanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EAttendanceComponent]
    });
    fixture = TestBed.createComponent(EAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
