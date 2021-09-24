import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  public product: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.product = this.activatedRoute.snapshot.paramMap.get('id');
  }

}
