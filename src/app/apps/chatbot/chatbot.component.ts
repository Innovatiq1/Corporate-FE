import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Event } from '@angular/router';
import { Message, ChatbotService } from './chatbot.service';
import { CourseService } from '../../../app/core/service/course.service';
@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss'],
})
export class ChatbotComponent {
  @ViewChild('msgInput') msgInput!: ElementRef;
  @ViewChild('msgSubmit') msgSubmit!: ElementRef;
  showBotSubject: boolean = false;
  showMessenger: boolean = false;
  messages: any[] = [];
  name: string = '';
  initialLoad: any;
  userSelectedItem = '';
  userMsg!: string ;

  constructor(public courseService: CourseService) {
    this.initialLoad = ['Courses','Programs','Login','Signup','Others']
  }

  ngOnInit() {}

  onIconClick() {
    console.log("clicked")
    this.showBotSubject = !this.showBotSubject;
    // this.msgInput.nativeElement.focus();


  }

  onCloseClick() {
    this.showBotSubject = false;
    this.showMessenger = false;
  }

  onBotSubjectSubmit() {
    this.showBotSubject = false;
    this.showMessenger = true;
  }
  chooseIssues(selectedItem:string){
console.log("iteam",selectedItem);
this.userMsg = selectedItem;
  }
  onMessengerSubmit(event: any) {
    console.log('event', event);
    let student = JSON.parse(localStorage.getItem('user_data')!).user.name;
    let studentId = JSON.parse(localStorage.getItem('user_data')!).user.id;
    const val = this.msgInput.nativeElement.value.toLowerCase();
    const mainval = this.msgInput.nativeElement.value;
    let nowtime = new Date();
    let nowhoue = nowtime.getHours();

    const userMsg = { type: 'user', text: mainval, id: studentId };
    const appendMsg = (msg: string) => {
      this.messages.push({ type: 'bot', text: msg });
      this.msgInput.nativeElement.value = '';
    };

    this.messages.push(userMsg);

    if (val === 'courses' || val.includes('1')) {
      appendMsg(
        '1.Payment 2.Course registration 3.Course Approval 4.Certificate issue'
      );
    } else if (
      val === 'payment' ||
      val === 'course registration' ||
      val === 'course approval' ||
      val === 'certificate issue'
    ) {
      appendMsg('Could you give us some more details on ...?');

      this.msgSubmit.nativeElement.addEventListener('click', (event: any) => {
        setTimeout(() => {
          this.sayBye();
        }, 3000);
      });
    } else if (val === 'programs') {
      appendMsg(
        '1.Payment 2.Program registration 3.Program Approval 4.Certificate issue'
      );
      // this.sayBye();
    } else if (
      val === 'payment' ||
      val === 'program registration' ||
      val === 'program approval' ||
      val === 'certificate issue'
    ) {
      appendMsg('Could you give us some more details on ...?');

      this.msgSubmit.nativeElement.addEventListener('click', (event: any) => {

        setTimeout(() => {
          this.sayBye();
        }, 3000);
      });
    } else if (val === 'login') {
      appendMsg(
        ' 1.Wait for Admin approval 2.Looks like your login information is incorrect  3.Others Issues'
      );
      this.sayBye();
    } else if (val.includes('wait for admin approval')) {
      appendMsg(
        'Please wait for administrator to approve it .Thank you for your patience...'
      );
      this.sayBye();
    } else if (val.includes('looks like your login information is incorrect')) {
      appendMsg(
        'Please enter correct details which you used while signup.Thank you...'
      );
      this.sayBye();
    } else if (val.includes('other issues')) {
      appendMsg('Could you give us some more details on ...?');
      // this.sayBye();
      this.msgSubmit.nativeElement.addEventListener('click', (event: any) => {
        setTimeout(() => {
          this.sayBye();
        }, 3000);
      });
    } else if (val === 'signup') {
      appendMsg('Could you please clarify what you want us to do?');
      // this.sayBye();
      this.msgSubmit.nativeElement.addEventListener('click', (event: any) => {
        setTimeout(() => {
          this.sayBye();
        }, 3000);
      });
    } else if (val === 'others') {
      appendMsg('Could you please clarify what you want us to do?');
      // this.sayBye();
      this.msgSubmit.nativeElement.addEventListener('click', (event: any) => {
        setTimeout(() => {
          this.sayBye();
        }, 3000);
      });
    }
    // setTimeout(() => {
    //   const lastMsgElement = document.querySelector('.Messages_list .msg:last-child');
    //   if (lastMsgElement) {
    //     lastMsgElement.scrollIntoView({ behavior: 'smooth' });
    //   }
    // });

    console.log('msg', this.messages);
  }

  sayBye() {
    // console.log('res');
    // let nowtime = new Date();
    // let nowhoue = nowtime.getHours();
    this.messages.push({
      type: 'bot',
      text: 'We understood your issue .please wait for us to resolve.Thank you for your patience....! ',

    });
    this.messages.push({ type: 'bot', text: 'Have a nice day! :)' });
    // if (nowhoue <= 10) {
    //   this.messages.push({ type: 'bot', text: 'Have a nice day! :)' });
    // } else if (nowhoue >= 11 || nowhoue <= 20) {
    //   this.messages.push({ type: 'bot', text: 'Goodbye!' });
    // } else {
    //   this.messages.push({ type: 'bot', text: 'Good night!' });
    // }
    let payload = {
      messages: this.messages,
    };
    this.courseService.saveChat(payload).subscribe((response) => {
      console.log('res', response);
    });
  }
}
