import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, of, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class BasicAuthHttpInterceptorService implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.addAuthToken(request))
    .pipe(catchError((x: HttpErrorResponse) => this.handleAuthError(x)));
  }

  addAuthToken(httpRequest:HttpRequest<any>) {
    if (sessionStorage.getItem('username') && sessionStorage.getItem('token')) {
      const token = sessionStorage.getItem('token') as string;
      return httpRequest.clone({
        setHeaders: {
          Authorization: `${token}`
        }
      })
    }

    return httpRequest;
  }

  handleAuthError(err: HttpErrorResponse): Observable<any>{
    if(err.status === 403){
      console.log("handleAuthError, err: ", err);
      this.router.navigate(['user-login']);
      // return of(err.message);
      return of(err.error);
    }

    return throwError(err);
  }
}
