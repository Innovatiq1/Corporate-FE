import { Component } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SupportService } from '../support/support.service';
import { StudentsService } from 'app/admin/students/students.service';
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
  chatId!:string;
 currentTime:any;
 source:any;
format: string|undefined;
user!:string;
  dataToUpdate: any;
  constructor(private studentService:StudentsService,public activeRoute: ActivatedRoute, private supportService: SupportService,public router:Router) {
    //constructor
    const today = new Date();
     this.currentTime = today.getHours() + ":" + today.getMinutes() ;

     this.activeRoute.queryParams.subscribe(param =>{
      this.chatId = param['id'];
     })
  }

  ngOnInit(){
this.getAllStudents();
this.formatAMPM(new Date)
this. getDetailedAboutTickets();
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

  getDetailedAboutTickets(){
   this.supportService.getTicketById(this.chatId).subscribe(res =>{
console.log("res",res);
 this.dataToUpdate = res;
  this.source = res.messages;
 this.user = res.messages[0].role;

   })
  }
  cancel(){
    this.router.navigate(['apps/support'])
  }
 update(){
  // console.log("source",this.dataToUpdate);
  this.supportService.updateChat(this.dataToUpdate).subscribe(res =>{
    this.router.navigate(['apps/support'])
  })
}

}
