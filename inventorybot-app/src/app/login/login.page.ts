import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { CommonService } from '../common.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import '@capacitor-community/http';
import { Plugins } from '@capacitor/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  productInformation=null
  barCode:any;
  constructor(private router: Router,private commonService: CommonService,public barcodeScanner : BarcodeScanner) { }

  ngOnInit() {
    //this.commonService.updateLoggedIn(true);
  }
  scan(){
    localStorage.setItem("loggedin","isLoggedIn");
    this.router.navigate(['/product/Product'])
    this.commonService.updateLoggedIn(true);
  }
  openBarCodeScanner(){
    //this.getProductWithBarCode("123456");//comment this if you want to test barcode scanning
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.barCode = barcodeData
      //   Barcode data {"cancelled":0,"text":"8413384010008","format":"EAN_13"}
      if (barcodeData) {
        let scanCode = barcodeData["text"];
        if (scanCode) {
          this.getProductWithBarCode(scanCode) 
        }
      }
      else{
        console.log("=== No data scanned !")
      }
    }).catch(err => {
      console.log('Error', err);
    });
  }
  async getProductWithBarCode(barcode){
    //alert(barcode)
    const { Http } = Plugins;
    let urlToCall = "https://fr.openfoodfacts.org/api/v0/produit/"+barcode+".json"
    let ret = await Http.request({
      method: 'GET',
      url: urlToCall,
      headers: {
        'content-type': 'application/json',
      }
    });
    console.log(ret)
    if (ret){
      this.productInformation = ret;
      console.log("==Product ",this.productInformation.product)
      localStorage.setItem("loggedin","isLoggedIn");
      localStorage.setItem("storeName","Metro Cash & Carry Store");
      localStorage.setItem("storeID","9b37ed16-9618-4154-b9db-b57f35c12808");
      localStorage.setItem("storeLocation","Kanakpura Road");
      localStorage.setItem("appRegisteredId","edb3ac37-311e-43eb-bf9e-4d5a977e9979");
      this.router.navigate(['/bot'])
      this.commonService.updateLoggedIn(true);
      
    }
  }
}
