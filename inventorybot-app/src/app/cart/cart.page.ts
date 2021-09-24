import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  public product: string;

  constructor(private activatedRoute: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    this.product = this.activatedRoute.snapshot.paramMap.get('id');
  }
  checkout(){
    this.router.navigate(['/checkout/Checkout'])
  }
}
