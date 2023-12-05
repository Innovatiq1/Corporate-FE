import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Event } from '@angular/router';
import {Message,ChatbotService} from './chatbot.service'

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent  {

  @ViewChild('msgInput') msgInput!: ElementRef;

  showBotSubject: boolean = false;
  showMessenger: boolean = false;
  messages: any[] = [];
  name: string = '';

  constructor() {}

  ngOnInit(){
  }
  onIconClick() {
    this.showBotSubject =  !this.showBotSubject;
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

  onMessengerSubmit() {
    const val = this.msgInput.nativeElement.value.toLowerCase();
    const mainval = this.msgInput.nativeElement.value;
    let nowtime = new Date();
    let nowhoue = nowtime.getHours();

    const userMsg = { type: 'user', text: mainval };
    const appendMsg = (msg: string) => {
      this.messages.push({ type: 'bot', text: msg });
      this.msgInput.nativeElement.value = '';
    };

    this.messages.push(userMsg);

    if (
      val.includes('courses') ||
      val.includes('1')
    ) {
      appendMsg("1.Payment 2.Course registration 3.Course Approval 4.Certificate issue");
    }
     else if (val.includes('payment') || val.includes('course registration') || val.includes('course approval') || val.includes('certificate issue')) {
      appendMsg("Please elaborate the issue you are facing");
      // if (val.includes('course') || val.includes('program') || val.includes('payment')) {
      //   appendMsg('Can you write your queries in details.');
      //   // appendMsg('Is it helpful? (yes/no)');
      // } else if (val.includes('okay') || val.includes('ok')) {
      //   appendMsg('Thank you!.');
      //   appendMsg('Is it helpful? (yes/no)');
      // } else {
      //   appendMsg("Sorry, I'm not able to understand your point. Please ask something else.");
      // }

    } else if (val.includes('program') || val.includes('2')) {
      appendMsg("1.Payment 2.Program registration 3.Program Approval 4.Certificate issue");
      // this.sayBye();
    } else if (val.includes('login')) {
      appendMsg(" 1.Wait for Admin approval 2.Looks like your login information is incorrect  3.Others");
      if(val.includes('admin approval')){
        appendMsg(" Please wait for administrator to approve it .Thank you for your patience...");
      }
      // this.sayBye();
    }else if (val.includes('signup')) {
      appendMsg("Type your issue");
      // this.sayBye();
    }
    else if (val.includes('others')) {
      appendMsg("Type your issue");
      // this.sayBye();
    }
    setTimeout(() => {
      const lastMsgElement = document.querySelector('.Messages_list .msg:last-child');
      if (lastMsgElement) {
        lastMsgElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  sayBye() {
    let nowtime = new Date();
    let nowhoue = nowtime.getHours();

    if (nowhoue <= 10) {
      this.messages.push({ type: 'bot', text: 'Have a nice day! :)' });
    } else if (nowhoue >= 11 || nowhoue <= 20) {
      this.messages.push({ type: 'bot', text: 'Goodbye!' });
    } else {
      this.messages.push({ type: 'bot', text: 'Good night!' });
    }
  }

}
