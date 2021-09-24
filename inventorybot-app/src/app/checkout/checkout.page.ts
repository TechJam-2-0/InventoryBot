import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  public product: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.product = this.activatedRoute.snapshot.paramMap.get('id');
  }

}
