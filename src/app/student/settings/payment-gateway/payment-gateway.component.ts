import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrls: ['./payment-gateway.component.scss']
})
export class PaymentGatewayComponent {
  breadscrums = [
    {
      title: 'Integration',
      items: ['Integration'],
      active: 'Payment Gateway',
    },
  ];

  paymentForm: UntypedFormGroup;
  highlightStripe: boolean = true;
  
  constructor(private fb: UntypedFormBuilder,) {
   
    this.paymentForm = this.fb.group({
      company: ['Innovatiq', [Validators.required]],
      public: ['********'],
      secret: ['********', [Validators.required]],
      test: ['test', [Validators.required]],
      live: ['']
    });
  }
  cancel() {
  
    window.history.back();
  }
}
