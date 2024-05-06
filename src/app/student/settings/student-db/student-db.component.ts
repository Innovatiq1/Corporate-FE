import { Component } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-db',
  templateUrl: './student-db.component.html',
  styleUrls: ['./student-db.component.scss']
})
export class StudentDbComponent {
  breadscrums = [
    {
      title: 'Blank',
      items: ['Dashboards'],
      active: 'Student Dashboard',
    },
  ];
  isStudent: boolean = true;
  dbForm!: FormGroup;

    
  constructor(private fb: UntypedFormBuilder,) {
   
    this.dbForm = this.fb.group({
      title1: ['Latest Enrolled Programs', [Validators.required]],
      view1: ['List-view', [Validators.required]],
      percent1: ['50', [Validators.required]],
      title2: ['Latest Enrolled Courses', [Validators.required]],
      view2: ['List-view', [Validators.required]],
      percent2: ['50', [Validators.required]],
      title3: ['Announcement Board', [Validators.required]],
      view3: ['List-view', [Validators.required]],
      percent3: ['30', [Validators.required]],
      title4: ['Rescheduled List', [Validators.required]],
      view4: ['List-view', [Validators.required]],
      percent4: ['70', [Validators.required]],
      title5: ['Upcoming Program Classes', [Validators.required]],
      view5: ['List-view', [Validators.required]],
      percent5: ['50', [Validators.required]],
      title6: ['Upcoming Course classes', [Validators.required]],
      view6: ['List-view', [Validators.required]],
      percent6: ['50', [Validators.required]],
     
    });
  }
  studentDb(){
      this.isStudent = false;
  }
  cancel() {
  
    window.history.back();
  }
}
