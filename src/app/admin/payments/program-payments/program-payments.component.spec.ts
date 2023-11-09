import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramPaymentsComponent } from './program-payments.component';

describe('ProgramPaymentsComponent', () => {
  let component: ProgramPaymentsComponent;
  let fixture: ComponentFixture<ProgramPaymentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgramPaymentsComponent]
    });
    fixture = TestBed.createComponent(ProgramPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
