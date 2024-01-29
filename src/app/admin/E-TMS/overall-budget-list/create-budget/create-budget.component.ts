import { Component } from '@angular/core';

@Component({
  selector: 'app-create-budget',
  templateUrl: './create-budget.component.html',
  styleUrls: ['./create-budget.component.scss']
})
export class CreateBudgetComponent {
  breadscrums = [
    {
      title: 'Over All Budget',
      // items: ['Extra'],
      active: 'Create New Budget',
    },
  ];

  constructor(){}
}
