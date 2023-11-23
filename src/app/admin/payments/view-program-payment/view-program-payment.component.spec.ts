import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProgramPaymentComponent } from './view-program-payment.component';

describe('ViewProgramPaymentComponent', () => {
  let component: ViewProgramPaymentComponent;
  let fixture: ComponentFixture<ViewProgramPaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewProgramPaymentComponent]
    });
    fixture = TestBed.createComponent(ViewProgramPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
