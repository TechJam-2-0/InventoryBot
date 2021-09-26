import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../common.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import '@capacitor-community/http';
import { Plugins } from '@capacitor/core';
import { ModalController } from '@ionic/angular';
import { ModalpayPage } from '../modalpay/modalpay.page';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.page.html',
  styleUrls: ['./payments.page.scss'],
})
export class PaymentsPage implements OnInit {
  public payments:any = [];
  storeName:any;
  storeID:any;
  constructor(private activatedRoute: ActivatedRoute,public modalController: ModalController) { }

  ngOnInit() {
    this.getOrders();
    
  }
  async getOrders(){
    this.storeName = localStorage.getItem("storeName");
    this.storeID = localStorage.getItem("storeID");
    const { Http } = Plugins;
    let urlToCall = "https://inventorybotapi.azurewebsites.net/api/v1/getAllPaymentTransactionByAppIdStoreId?appId=edb3ac37-311e-43eb-bf9e-4d5a977e9979&storeId="+this.storeID+""
    let ret = await Http.request({
      method: 'GET',
      url: urlToCall,
      headers: {
        'content-type': 'application/json',
      }
    });
    console.log(ret.data)
    if (ret.data){
      this.payments = ret.data;
    }
  }
  getOrderDate(date){
    let dateConverted  = new Date(date)
    return dateConverted.toISOString();
  }
  async presentModal(ord) {
    const modal = await this.modalController.create({
      component: ModalpayPage,
      cssClass: 'my-custom-class',
      componentProps: {
        order: ord
      }
    });
    return await modal.present();
  }

}
