import { Component, OnInit } from '@angular/core';
import { Event } from '@angular/router';
import {Message,ChatbotService} from './chatbot.service'

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit {

  isVisited:boolean = false;
  messages: Message[] = [];
  value: any;
  constructor( public chatService: ChatbotService) {}

  ngOnInit(){
    this.chatService.conversation.subscribe((val) => {
      // console.log(this.value)
      this.messages = this.messages.concat(val);
    });

  }
  sendMessage() {
    // console.log(this.value)
    this.chatService.getBotAnswer(this.value);
    this.value = '';
  }

  public checkVisited() {
    // reverse the value of property
    this.isVisited = !this.isVisited;
 }
}
