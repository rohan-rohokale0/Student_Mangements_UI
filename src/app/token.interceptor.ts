import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './Modules/auth/Services/auth.service';
import { Router } from '@angular/router';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { TokenApiModel } from './Model/Token-api.model';

@Injectable()

export class TokenInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService, private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.auth.getToken();
    
    if (token) {
      request = this.addToken(request, token);
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !request.url.includes('refresh')) {
          return this.handleUnAuthorizedError(request, next);
        }
        return throwError(error);
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  private handleUnAuthorizedError(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const tokenModel = new TokenApiModel();
    tokenModel.accessToken = this.auth.getToken();
    tokenModel.refreshToken = this.auth.getRefreshToken();
    
    return this.auth.renewToken(tokenModel).pipe(
      switchMap((data: TokenApiModel) => {
        this.auth.storeToken(data.accessToken);
        req = this.addToken(req, data.accessToken);
        return next.handle(req);
      }),
      catchError((err) => {
        this.router.navigate(['/auth/sign-in']);
        return throwError(err);
      })
    );
  }
}