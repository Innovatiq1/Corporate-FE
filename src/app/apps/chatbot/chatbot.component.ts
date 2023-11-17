import { Component, OnInit } from '@angular/core';
import { Event } from '@angular/router';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit {

  isVisited:boolean = false;

  ngOnInit(){


  }

  public checkVisited() {
    // reverse the value of property
    this.isVisited = !this.isVisited;
 }
}
