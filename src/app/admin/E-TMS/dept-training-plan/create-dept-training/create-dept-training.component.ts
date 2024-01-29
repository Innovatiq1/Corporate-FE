import { Component } from '@angular/core';

@Component({
  selector: 'app-create-dept-training',
  templateUrl: './create-dept-training.component.html',
  styleUrls: ['./create-dept-training.component.scss']
})
export class CreateDeptTrainingComponent {
  breadscrums = [
    {
      title: 'Over All Budget',
      // items: ['Extra'],
      active: 'Create Training Plan',
    },
  ];
}
