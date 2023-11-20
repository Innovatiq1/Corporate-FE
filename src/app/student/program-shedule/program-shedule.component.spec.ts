import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramSheduleComponent } from './program-shedule.component';

describe('ProgramSheduleComponent', () => {
  let component: ProgramSheduleComponent;
  let fixture: ComponentFixture<ProgramSheduleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgramSheduleComponent]
    });
    fixture = TestBed.createComponent(ProgramSheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
