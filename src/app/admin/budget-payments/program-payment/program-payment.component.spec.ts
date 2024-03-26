import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramPaymentComponent } from './program-payment.component';

describe('ProgramPaymentComponent', () => {
  let component: ProgramPaymentComponent;
  let fixture: ComponentFixture<ProgramPaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgramPaymentComponent]
    });
    fixture = TestBed.createComponent(ProgramPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
