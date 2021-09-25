import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonService } from './common.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  public appPages = [
    { title: 'Product', url: '/product/Product', icon: 'scan' },
    /* { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' }, */
    { title: 'Cart', url: '/cart/Cart', icon: 'cart' },
    { title: 'My Orders', url: '/orders/Orders', icon: 'settings' }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  public loggedin:boolean = true;
  private loginSub: Subscription;
  constructor(private commonService: CommonService,private router: Router) {}
  ngOnInit(){
    this.commonService.updateLoggedIn(true);
    this.loginSub = this.commonService.main$.subscribe((loggedin) => {
      this.loggedin = loggedin;
    });
  }
  ngOnDestroy() {
    this.loginSub.unsubscribe();
  }
  logOff(){
    this.commonService.updateLoggedIn(false);
    this.router.navigate(['/login'])
  }
}
