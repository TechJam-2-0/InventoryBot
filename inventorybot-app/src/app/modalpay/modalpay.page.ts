import { Component, OnInit,Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modalpay',
  templateUrl: './modalpay.page.html',
  styleUrls: ['./modalpay.page.scss'],
})
export class ModalpayPage implements OnInit {
  @Input() order: any;
  constructor(public viewCtrl: ModalController) { }

  ngOnInit() {
    console.log(this.order)
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

}
