import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  public product: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.product = this.activatedRoute.snapshot.paramMap.get('id');
  }

}
