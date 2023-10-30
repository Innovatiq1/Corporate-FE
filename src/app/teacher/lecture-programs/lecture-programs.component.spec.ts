import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LectureProgramsComponent } from './lecture-programs.component';

describe('LectureProgramsComponent', () => {
  let component: LectureProgramsComponent;
  let fixture: ComponentFixture<LectureProgramsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LectureProgramsComponent]
    });
    fixture = TestBed.createComponent(LectureProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
