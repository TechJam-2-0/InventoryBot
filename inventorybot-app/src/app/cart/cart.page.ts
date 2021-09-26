import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  public product: string;
  public cartItems:any= [{
    "productImage":"",
    "productId": "P1",
    "productName": "ababcba",
    "productPrice":12
  }]
  storeName:string;
  constructor(private commonService: CommonService,private activatedRoute: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    this.product = this.activatedRoute.snapshot.paramMap.get('id');
    this.cartItems = this.commonService.cart;
    this.storeName = localStorage.getItem("storeName");
  }
  checkout(){
    this.router.navigate(['/checkout/Checkout'])
  }
  removeQty(cart){
    if(cart.productQty>1)
    cart.productQty--;
  }
  addQty(cart){
    cart.productQty++;
  }
}
