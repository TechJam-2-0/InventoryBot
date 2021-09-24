import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  currentLoggedIn = new Subject<any>();
  main$ = this.currentLoggedIn.asObservable();
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
