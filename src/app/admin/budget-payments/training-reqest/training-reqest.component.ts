import { Component } from '@angular/core';
@Component({
  selector: 'app-training-reqest',
  templateUrl: './training-reqest.component.html',
  styleUrls: ['./training-reqest.component.scss']
})
export class TrainingReqestComponent {
  breadscrums = [
    {
      title: 'Blank',
      items: ['Finance'],
      active: 'Training Request',
    },
  ];
  constructor() {
    // constructor
  }
}
