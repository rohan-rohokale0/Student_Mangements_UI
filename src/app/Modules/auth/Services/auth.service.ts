import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { ApiUrlConstants } from '../../shared/Common_Module_File/ApiUrlConstants';
import { HttpRequestService } from '../../shared/Services/http-request.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userPayload:any;
  constructor(private http: HttpClient, private router: Router) {
    this.userPayload = this.decodedToken();
   }

  signUp(userObj: any) {
    return this.http.post<any>(ApiUrlConstants.register, userObj)
  }

  signIn(loginObj : any){
    return this.http.post<any>(ApiUrlConstants.login,loginObj)
  }

  signOut(){
    localStorage.clear();
    this.router.navigate(['/auth/sign-in']);
  }

  storeToken(tokenValue: string){
    localStorage.setItem('token', tokenValue)
  }
  storeUserDetails(user:any)
  {
    const jsonString = JSON.stringify(user);
    localStorage.setItem('loginUserDetails', jsonString)
  }
  storeRefreshToken(tokenValue: string){
    localStorage.setItem('refreshToken', tokenValue)
  }
  getUserDetails()
  {
    return localStorage.getItem('loginUserDetails')
  }

  getToken(){
    return localStorage.getItem('token')
  }
  getRefreshToken(){
    return localStorage.getItem('refreshToken')
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem('token')
  }

  decodedToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwtHelper.decodeToken(token))
    return jwtHelper.decodeToken(token)
  }

  getfullNameFromToken(){
    if(this.userPayload)
    return this.userPayload.name;
  }

  getRoleFromToken(){
    if(this.userPayload)
    return this.userPayload.role;
  }

  renewToken(tokenApi : any){
    return this.http.post<any>(ApiUrlConstants.refreshToken, tokenApi)
  }
}