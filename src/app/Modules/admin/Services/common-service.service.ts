import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonServiceService {
  private sidebarName = new BehaviorSubject<any>(null);

  constructor() {}

  setValue(value: any) {
    this.sidebarName.next(value);
  }
  getValue() {
    return this.sidebarName.asObservable();
  }

  getUserDetails() {
    var data=localStorage.getItem('loginUserDetails');
    return data;
  }
}
