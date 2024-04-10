import { Component} from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';


@Component({
  selector: 'app-e-attendance',
  templateUrl: './e-attendance.component.html',
  styleUrls: ['./e-attendance.component.scss']
})
export class EAttendanceComponent {
  attendanceForm: UntypedFormGroup;
  headeritems: string[] = ['Employee Name', ...Array.from({ length: 31 }, (_, i) => (i + 1).toString())];
  dataSource = [
    { employeeName: 'Chung' },
    { employeeName: 'Thomas'},
    { employeeName: 'Bolin' },
    { employeeName: 'Yichen' },
    { employeeName: 'Jun Hi'},
     
  ];
  constructor() {
    this.attendanceForm = new UntypedFormGroup({
      fromDate: new UntypedFormControl(),
      toDate: new UntypedFormControl(),
    });
  }

}
