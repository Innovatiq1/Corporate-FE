import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingProgramsComponent } from './pending-programs.component';

describe('PendingProgramsComponent', () => {
  let component: PendingProgramsComponent;
  let fixture: ComponentFixture<PendingProgramsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PendingProgramsComponent]
    });
    fixture = TestBed.createComponent(PendingProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
