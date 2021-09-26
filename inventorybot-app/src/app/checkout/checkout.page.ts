import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { Checkout } from 'capacitor-razorpay';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  public product: string;
  
  public cartItems:any= [{
    "productImage":"",
    "productId": "P1",
    "prodcutName": "ababcba",
    "productPrice":12
  }]
  storeName:string;
  getLocation:any;
  // Location coordinates
  latitude: number;
  longitude: number;
  accuracy: number;
  //Geocoder configuration
  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };
  constructor(private commonService: CommonService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,private alertController: AlertController) { }

  ngOnInit() {
    this.product = this.activatedRoute.snapshot.paramMap.get('id');
    this.cartItems = this.commonService.cart;
    this.storeName = "Metro Cash and Carry"
    let options = {
        enableHighAccuracy : true
    };
    this.geolocation.getCurrentPosition(options).then((pos) => {
      this.latitude = pos.coords.latitude;
      this.longitude = pos.coords.longitude;
      this.accuracy = pos.coords.accuracy;
      this.getGeoencoder(pos.coords.latitude, pos.coords.longitude);
      console.log(pos); // here is your current pos
     

    },(err)=>{
        console.log("error : " + err.message);
        

    });
  }
  getGeoencoder(latitude, longitude) {
    this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoencoderOptions)
      .then((result: NativeGeocoderResult[]) => {
        this.getLocation = this.generateAddress(result[0]);
      })
      .catch((error: any) => {
        alert('Error getting location' + JSON.stringify(error));
      });
  }

  //Return Comma saperated address
  generateAddress(addressObj) {
    let obj = [];
    let address = "";
    for (let key in addressObj) {
      obj.push(addressObj[key]);
    }
    obj.reverse();
    for (let val in obj) {
      if (obj[val].length)
        address += obj[val] + ', ';
    }
    return address.slice(0, -2);
  }
  getSubTotal(){
    let total = 0;
    this.cartItems.forEach(element => {
      total = total + element.productPrice*element.productQty
    });
    return total;
  }
  getTotal(){
    let total = 0;
    let subtotal = this.getSubTotal();
    total = subtotal -  (subtotal*5)/100;
    return total;
  }
  removeQty(cart){
    if(cart.productQty >1 )
    cart.productQty--;
  }
  addQty(cart){
    cart.productQty++;
  }
  async payWithRazorpay(){
    let amount = this.getTotal()*100;
    const options = { 
      key: 'rzp_test_fVcu1kVAZuXUqO',
      amount: amount.toString(),
      description: 'Great offers', 
      image: 'https://imgur.com/u0RmlEV',
      
      currency: 'INR', 
      name: 'Inventory App Lumen Inc', 
      prefill: { 
        email: 'sujoy.mitra@lumen.com', 
        contact: '9972929589'
      },
      theme: {
        color: '#3399cc'
      }
    }
    try {
    let data = (await Checkout.open(options));
    console.log(data);
     
    this.commonService.paymentDetails = {
      orderId : "adbaef17-79bf-4947-ae3d-545a88a57e58",
      appRegisteredId : "edb3ac37-311e-43eb-bf9e-4d5a977e9979",
      storeId : "9b37ed16-9618-4154-b9db-b57f35c12808",
      storeName : "Metro Cash and Carry Kanakapura Road",
      transactionAmount : this.getTotal().toString(),
      transactionDate : new Date()
    }
    this.router.navigate(['/confirm'])
    //this.presentAlert(data.response);
    } catch (error) {
      this.presentAlert(error.message); //Doesn't appear at all
    }
  }

  async presentAlert(response: string){
    // let responseObj = JSON.parse(response)
    console.log("message"+ response['razorpay_payment_id']);
    const alert = await this.alertController.create({
      message:response['razorpay_payment_id'],
      backdropDismiss: true,
    });

    await alert.present();
  }
}
