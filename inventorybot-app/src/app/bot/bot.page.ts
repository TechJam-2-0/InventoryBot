import { Component, OnInit } from '@angular/core';
import {ChatMessage, MessageType} from "./model";
@Component({
  selector: 'app-bot',
  templateUrl: './bot.page.html',
  styleUrls: ['./bot.page.scss'],
})
export class BotPage implements OnInit {
  messages: any[];
  public chatMessage: ChatMessage;
  public messageType = MessageType;

  constructor() {
    this.messages = [
      {
        type:'message_request',
        from: 'Sujoy',
        message: 'Hi',
        epoch:'12345'
      },
      {
        type:'message_response',
        from: 'Server',
        message: 'Hello',
        epoch:'12345'
      }
    ];
   }

  ngOnInit() {
  }

}
