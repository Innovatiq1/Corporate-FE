import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProgramScheduleComponent } from './view-program-schedule.component';

describe('ViewProgramScheduleComponent', () => {
  let component: ViewProgramScheduleComponent;
  let fixture: ComponentFixture<ViewProgramScheduleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewProgramScheduleComponent]
    });
    fixture = TestBed.createComponent(ViewProgramScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
