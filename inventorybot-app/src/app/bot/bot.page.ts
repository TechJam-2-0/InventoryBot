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
    this.messages = [{
      type:'message_response',
      from: 'Sujoy',
      message: `Hello Sujoy Mitra`,
      epoch:new Date().toLocaleString()
    },
    {
      type:'message_response',
      from: 'Sujoy',
      message: `Welcome to Metro Cash and Carry.`,
      epoch:new Date().toLocaleString()
    },
    {
      type:'message_response',
      from: 'Sujoy',
      message: `How Can I help You? Do you want to check your existing orders.`,
      epoch:new Date().toLocaleString()
    },
    ];
   }

  ngOnInit() {
  }
  sendMessage(){
    let req = this.botinput;
    this.messages.push({
      type:'message_request',
      from: 'Sujoy',
      message: req,
      epoch:new Date().toLocaleString()
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
      if(req.toLowerCase() == 'hi'){
        this.messages.push({
        type:'message_response',
        from: 'Server',
        message: 'Hello,Sujoy Mitra, Welcome to Inventory Bot App',
        epoch: new Date().toLocaleString()
        })
      }
      else if(req.toLowerCase() == "yes"){
        this.messages.push({
          type:'message_response',
          from: 'Sujoy',
          message: `
            These are your existing orders : 
            Order ID : dbaef17-79bf-4947-ae3d-545a88a57e58
            Order ID : 067cbb22-edcf-453a-b4c2-277ceae8bf3e

            You can start adding product and create new Order.
          `,
          epoch:new Date().toLocaleString()
        });
      }
      else if(req.includes("get order details") || req.includes("order details") || req.includes("order")){
        this.messages.push({
          type:'message_response',
          from: 'Sujoy',
          message: `
            These are your existing orders : 
            Order ID : dbaef17-79bf-4947-ae3d-545a88a57e58
            Order ID : 067cbb22-edcf-453a-b4c2-277ceae8bf3e
          `,
          epoch:new Date().toLocaleString()
        });
      }
      else if(req.toLowerCase() == 'order dbaef17-79bf-4947-ae3d-545a88a57e58' || req.toLowerCase() == 'dbaef17-79bf-4947-ae3d-545a88a57e58'){
        this.messages.push({
          type:'message_response',
          from: 'Server',
          message: 'Orders with ID : dbaef17-79bf-4947-ae3d-545a88a57e58 is created on 25/9/2021',
          epoch:new Date().toLocaleString()
        })
      }
      else if(req.toLowerCase() == 'order 067cbb22-edcf-453a-b4c2-277ceae8bf3e' || req.toLowerCase() == '067cbb22-edcf-453a-b4c2-277ceae8bf3e'){
        this.messages.push({
          type:'message_response',
          from: 'Server',
          message: 'Orders with ID : 067cbb22-edcf-453a-b4c2-277ceae8bf3e is created on 25/9/2021',
          epoch:new Date().toLocaleString()
        })
      }
      else if(req.toLowerCase() == 'order 067cbb22-edcf-453a-b4c2-277ceae8bf3e'){
        this.messages.push({
          type:'message_response',
          from: 'Server',
          message: 'Orders with ID : 067cbb22-edcf-453a-b4c2-277ceae8bf3e is created on 25/9/2021',
          epoch:new Date().toLocaleString()
        })
      }
      else if(req.toLowerCase() == 'payment details'){
        this.messages.push({
          type:'message_response',
          from: 'Server',
          message: 'There are multiple payments. Enter payment id to get details',
          epoch:new Date().toLocaleString()
        })
      }
      else if(req.toLowerCase() == 'payment 03675cbb-28c1-4625-960b-3954c0aced9f' || req.toLowerCase() == '03675cbb-28c1-4625-960b-3954c0aced9f'){
        this.messages.push({
          type:'message_response',
          from: 'Server',
          message: `
            Transaction ID": "03675cbb-28c1-4625-960b-3954c0aced9f",
            Order ID": "adbaef17-79bf-4947-ae3d-545a88a57e58",
            AppRegistered ID: "edb3ac37-311e-43eb-bf9e-4d5a977e9979",
            Store ID: "9b37ed16-9618-4154-b9db-b57f35c12808",
            Store Name: "Metro Cash and Carry Kanakapura Road",
            Transaction Type: "Cash",
            Transaction Amount: "1245",
            Transaction Date: "25/9/2021"
          `,
          epoch:new Date().toLocaleString()
        })
      }
      else if(req.toLowerCase() == 'payment cash' || req.toLowerCase() == 'cash'){
        this.messages.push({
          type:'message_response',
          from: 'Server',
          message: `
            Transaction ID": "03675cbb-28c1-4625-960b-3954c0aced9f",
            Order ID": "adbaef17-79bf-4947-ae3d-545a88a57e58",
            AppRegistered ID: "edb3ac37-311e-43eb-bf9e-4d5a977e9979",
            Store ID: "9b37ed16-9618-4154-b9db-b57f35c12808",
            Store Name: "Metro Cash and Carry Kanakapura Road",
            Transaction Type: "Cash",
            Transaction Amount: "1245",
            Transaction Date: "25/9/2021"
          `,
          epoch:new Date().toLocaleString()
        })
      }
      else if(req.toLowerCase() == 'payment 087bea91-e25f-45e8-87c2-e1fceb821175' || req.toLowerCase() == '087bea91-e25f-45e8-87c2-e1fceb821175'){
        this.messages.push({
          type:'message_response',
          from: 'Server',
          message: `
            Transaction ID": "087bea91-e25f-45e8-87c2-e1fceb821175",
            Order ID": "adbaef17-79bf-4947-ae3d-545a88a57e58",
            AppRegistered ID: "edb3ac37-311e-43eb-bf9e-4d5a977e9979",
            Store ID: "9b37ed16-9618-4154-b9db-b57f35c12808",
            Store Name: "Metro Cash and Carry Kanakapura Road",
            Transaction Type: "Card",
            Transaction Amount: "15045",
            Transaction Date: "23/9/2021"
          `,
          epoch:new Date().toLocaleString()
        })
      }
      else if(req.toLowerCase() == 'payment card' || req.toLowerCase() == 'card'){
        this.messages.push({
          type:'message_response',
          from: 'Server',
          message: `
            Transaction ID": "087bea91-e25f-45e8-87c2-e1fceb821175",
            Order ID": "adbaef17-79bf-4947-ae3d-545a88a57e58",
            AppRegistered ID: "edb3ac37-311e-43eb-bf9e-4d5a977e9979",
            Store ID: "9b37ed16-9618-4154-b9db-b57f35c12808",
            Store Name: "Metro Cash and Carry Kanakapura Road",
            Transaction Type: "Card",
            Transaction Amount: "15045",
            Transaction Date: "23/9/2021"
          `,
          epoch:new Date().toLocaleString()
        })
      }
      else{
        this.messages.push({
          type:'message_response',
          from: 'Server',
          message: 'Sorry not able answer your question',
          epoch:new Date().toLocaleString()
        })
      }
      
    }
  }
}
