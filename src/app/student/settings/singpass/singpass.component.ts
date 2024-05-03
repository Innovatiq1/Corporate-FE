import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-singpass',
  templateUrl: './singpass.component.html',
  styleUrls: ['./singpass.component.scss']
})
export class SingpassComponent {
  breadscrums = [
    {
      title: 'Integration',
      items: ['Integration'],
      active: 'Singpass',
    },
  ];

  smtpForm: UntypedFormGroup;
  
  constructor(private fb: UntypedFormBuilder,) {
   
    this.smtpForm = this.fb.group({
      client: ['Innovatiq', [Validators.required]],
      signing: ['*****', [Validators.required]],
      endpoint: ['https://rp.com/.well-known/jwks.json', [Validators.required]],
      // email: [
      //   '',
      //   [Validators.required, Validators.email, Validators.minLength(5)],
      // ],
      key: ['**********'],
      kid: ['**********', [Validators.required]],
    });
  }
  cancel() {
  
    window.history.back();
  }
}
