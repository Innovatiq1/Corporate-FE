import { Component } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { StudentsService } from 'app/admin/students/all-students/students.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  hideRequiredControl = new UntypedFormControl(false);
  breadscrums = [
    {
      title: 'Chat',
      items: ['Apps'],
      active: 'Chat',
    },
  ];
  students: any;
 currentTime:any
format: string|undefined;
  constructor(private studentService:StudentsService) {
    //constructor
    const today = new Date();
     this.currentTime = today.getHours() + ":" + today.getMinutes() ;
  }

  ngOnInit(){
this.getAllStudents();
this.formatAMPM(new Date)
console.log(this.currentTime)
  }

   formatAMPM(date: { getHours: () => any; getMinutes: () => any; }) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    this.currentTime = hours + ':' + minutes + ' ' + ampm;

  }

  // console.log();

  getAllStudents(){
    let payload = {
      type: "Student"
    }
    this.studentService.getStudent(payload).subscribe(response =>{
    this.students = response.data
    });

  }
}
