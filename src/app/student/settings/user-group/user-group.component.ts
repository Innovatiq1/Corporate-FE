import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-group',
  templateUrl: './user-group.component.html',
  styleUrls: ['./user-group.component.scss']
})
export class UserGroupComponent {
  userTypeFormGroup!: FormGroup;
  breadscrums = [
    {
      title: 'Admin',
      items: ['Manage Users'],
      active: '',
    },
  ];
  constructor(private fb: FormBuilder, private router:Router){

    this.userTypeFormGroup = this.fb.group({
      typeName: ['', []],
    });
  }
}
