import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramApprovalComponent } from './program-approval.component';

describe('ProgramApprovalComponent', () => {
  let component: ProgramApprovalComponent;
  let fixture: ComponentFixture<ProgramApprovalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgramApprovalComponent]
    });
    fixture = TestBed.createComponent(ProgramApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
