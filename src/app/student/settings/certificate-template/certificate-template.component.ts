import { Component } from '@angular/core';

@Component({
  selector: 'app-certificate-template',
  templateUrl: './certificate-template.component.html',
  styleUrls: ['./certificate-template.component.scss']
})
export class CertificateTemplateComponent {
  breadscrums = [
    {
      title: 'Certificate',
      items: ['Customize'],
      active: 'Certificate',
    },
  ];
}
