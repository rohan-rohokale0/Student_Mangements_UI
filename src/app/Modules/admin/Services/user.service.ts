import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequestService } from '../../shared/Services/http-request.service';
import { ApiUrlConstants } from '../../shared/Common_Module_File/ApiUrlConstants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  
  getAllUsers(): Observable<any> {
    return this.http.get<any>(ApiUrlConstants.getAllUsers);
  }
}
