import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.page.html',
  styleUrls: ['./confirm.page.scss'],
})
export class ConfirmPage implements OnInit {
  public paymentDetails:any;
  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.commonService.cart = [];
    this.paymentDetails = this.commonService.paymentDetails;
  }

}
