import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentDailogComponent } from './payment-dailog.component';

describe('PaymentDailogComponent', () => {
  let component: PaymentDailogComponent;
  let fixture: ComponentFixture<PaymentDailogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentDailogComponent]
    });
    fixture = TestBed.createComponent(PaymentDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
