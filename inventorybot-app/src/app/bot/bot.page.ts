import { Component, OnInit } from '@angular/core';
import {ChatMessage, MessageType} from "./model";
import '@capacitor-community/http';
import { Plugins } from '@capacitor/core';
@Component({
  selector: 'app-bot',
  templateUrl: './bot.page.html',
  styleUrls: ['./bot.page.scss'],
})
export class BotPage implements OnInit {
  messages: any[];
  public chatMessage: ChatMessage;
  public messageType = MessageType;
  botinput : any = '';
  constructor() {
    this.messages = [];
   }

  ngOnInit() {
  }
  sendMessage(){
    let req = this.botinput;
    this.messages.push({
      type:'message_request',
      from: 'Sujoy',
      message: req,
      epoch:'12345'
    })
    console.log("message sent")
    this.getBotData(req);
    this.botinput = '';
  }
  async getBotData(req){
    //alert(barcode)
    const { Http } = Plugins;
    let urlToCall = "https://fr.openfoodfacts.org/api/v0/produit/"+req+".json"
    let ret = await Http.request({
      method: 'GET',
      url: urlToCall,
      headers: {
        'content-type': 'application/json',
      }
    });
    if (ret.data){
      this.messages.push({
        type:'message_response',
        from: 'Server',
        message: 'Hello',
        epoch:'12345'
      })
    }
  }
}
