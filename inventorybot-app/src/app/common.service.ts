import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  currentLoggedIn = new Subject<any>();
  main$ = this.currentLoggedIn.asObservable();
  public cart:any=[];
  public paymentDetails:any = {
      orderId : "adbaef17-79bf-4947-ae3d-545a88a57e58",
      appRegisteredId : "edb3ac37-311e-43eb-bf9e-4d5a977e9979",
      storeId : "9b37ed16-9618-4154-b9db-b57f35c12808",
      storeName : "Metro Cash and Carry Kanakapura Road",
      transactionAmount : 22,
      transactionDate : new Date()
    };
  constructor() { }
  updateLoggedIn(course) {
    /* do something with the value */
    this.currentLoggedIn.next(true);
  }

  deleteLoggedIn(course) {
    /* do something with the value */
    this.currentLoggedIn.next(false);
  }
}
