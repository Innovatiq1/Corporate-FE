import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-smtp',
  templateUrl: './smtp.component.html',
  styleUrls: ['./smtp.component.scss']
})
export class SmtpComponent {
  breadscrums = [
    {
      title: 'Integration',
      items: ['Integration'],
      active: 'SMTP',
    },
  ];

  smtpForm: UntypedFormGroup;
  
  constructor(private fb: UntypedFormBuilder,) {
   
    this.smtpForm = this.fb.group({
      email: ['support@innovatiq.com', [Validators.required]],
      sender: ['Innovatiq', [Validators.required]],
      login: ['admin', [Validators.required]],
      // email: [
      //   '',
      //   [Validators.required, Validators.email, Validators.minLength(5)],
      // ],
      server: ['203.118.55.27'],
      port: ['44', [Validators.required]],
      password: ['********'],
    });
  }
  cancel() {
  
    window.history.back();
  }
}
