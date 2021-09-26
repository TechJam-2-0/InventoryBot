import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Animation, AnimationController } from '@ionic/angular';
import { CommonService } from '../common.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import '@capacitor-community/http';
import { Plugins } from '@capacitor/core';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  public product: string;
  selectedSize: number;
  selectedColor: number;
  activeVariation: string;
  addProduct:boolean=true;
  productDetails:boolean=false;
  productInformation=null
  barCode:any;
  storeName:any;
  storeID:any;
  constructor(public alertController: AlertController,private router: Router,private animatioCntrl: AnimationController,private activatedRoute: ActivatedRoute,private commonService: CommonService,public barcodeScanner : BarcodeScanner) { }

  ngOnInit() {
    this.product = this.activatedRoute.snapshot.paramMap.get('id');
    this.activeVariation = 'size';
    this.storeName = localStorage.getItem("storeName");
      this.storeID = localStorage.getItem("storeID");
  }

  segmentChanged(e: any) {
    this.activeVariation = e.detail.value;

    if (this.activeVariation == 'color') {
      this.animatioCntrl.create()
      .addElement(document.querySelector('.sizes'))
      .duration(500)
      .iterations(1)
      .fromTo('transform', 'translateX(0px)', 'translateX(100%)')
      .fromTo('opacity', '1', '0.2')
      .play();

      this.animatioCntrl.create()
      .addElement(document.querySelector('.colors'))
      .duration(500)
      .iterations(1)
      .fromTo('transform', 'translateX(-100%)', 'translateX(0)')
      .fromTo('opacity', '0.2', '1')
      .play();
    } else {
      this.animatioCntrl.create()
      .addElement(document.querySelector('.sizes'))
      .duration(500)
      .iterations(1)
      .fromTo('transform', 'translateX(100%)', 'translateX(0)')
      .fromTo('opacity', '0.2', '1')
      .play();

      this.animatioCntrl.create()
      .addElement(document.querySelector('.colors'))
      .duration(500)
      .iterations(1)
      .fromTo('transform', 'translateX(0px)', 'translateX(-100%)')
      .fromTo('opacity', '1', '0.2')
      .play();
    }
  }
  openBarCodeScanner(){
    //this.getProductWithBarCode("6904530115");//comment this if you want to test barcode scanning
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
    let urlToCall = "https://inventorybotapi.azurewebsites.net/api/v1/getAllProductsByStoreId?storeId="+this.storeID+""
    let ret = await Http.request({
      method: 'GET',
      url: urlToCall,
      headers: {
        'content-type': 'application/json',
      }
    });
    console.log(ret.data)
    let data = ret.data
      let filterProduct = data.storeProducts.filter((item)=>item.productId == barcode);
      this.productInformation = filterProduct[0];
      this.productInformation.qty = 1;
      //this.productInformation.productPrice = 12;
      //this.productInformation.productId = 12345;
      //this.productInformation.productName = "Haldiram Bhujia";
      this.productInformation.description = "A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart.";
      console.log("==Product ",this.productInformation.product)
      localStorage.setItem("loggedin","isLoggedIn");
      
      this.productDetails = true;
      this.addProduct = false;
      this.commonService.updateLoggedIn(true);
    
  }
  changeSize(size: number) {
    this.selectedSize = size;
  }

  changeColor(color: number) {
    this.selectedColor = color;
  }
  removeQty(){
    if(this.productInformation.qty>1)
    this.productInformation.qty--;
  }
  addQty(){
    this.productInformation.qty++;
  }
  addToCart(){
    let cartItems = this.commonService.cart;
    let item = {
      "productImage":"",
      "productId": this.productInformation.productId,
      "productName": this.productInformation.productName,
      "productDescription":this.productInformation.description,
      "productPrice":this.productInformation.productPrice,
      productQty:this.productInformation.qty
    }
    let itemFound = false;
    if(cartItems.length >= 1)
    cartItems.forEach(it =>{ 
      if(it.productId == item.productId){
        it.productQty = it.productQty + item.productQty;
        itemFound = true
      }
    })
    if(itemFound){
      this.commonService.cart = [...cartItems];
      this.presentAlertConfirm();
    }
    else{
      cartItems.push({
      "productImage":"",
      "productId": this.productInformation.productId,
      "productName": this.productInformation.productName,
      "productDescription":this.productInformation.description,
      "productPrice":this.productInformation.productPrice,
      productQty:this.productInformation.qty
    }); 
      this.commonService.cart = [...cartItems];
      this.presentAlertConfirm();
    }
    
    
  }
  buynow(){
    let cartItems = [];
    cartItems.push({
      "productImage":"",
      "productId": this.productInformation.productId,
      "productName": this.productInformation.productName,
      "productDescription":this.productInformation.description,
      "productPrice":this.productInformation.productPrice,
      productQty:this.productInformation.qty
    });
    this.commonService.cart = cartItems;
    this.router.navigate(['/checkout/Checkout'])
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Product Added',
      message: 'Add more product',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            this.productDetails = false;
            this.addProduct = true;
          }
        }
      ]
    });

    await alert.present();
  }
}
