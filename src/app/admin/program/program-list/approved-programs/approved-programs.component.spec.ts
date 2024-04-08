import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedProgramsComponent } from './approved-programs.component';

describe('ApprovedProgramsComponent', () => {
  let component: ApprovedProgramsComponent;
  let fixture: ComponentFixture<ApprovedProgramsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApprovedProgramsComponent]
    });
    fixture = TestBed.createComponent(ApprovedProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
