import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  public product: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.product = this.activatedRoute.snapshot.paramMap.get('id');
  }

}
