import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class InstructorSettingsComponent {
  breadscrums = [
    {
      title: 'Settings',
      items: ['Instructor'],
      active: 'Settings',
    },
  ];

  constructor() {
    // constructor
  }
}
