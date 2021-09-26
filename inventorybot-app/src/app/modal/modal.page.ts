import { Component, OnInit,Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  @Input() order: any;
  constructor(public viewCtrl: ModalController) { }

  ngOnInit() {
    console.log(this.order)
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
