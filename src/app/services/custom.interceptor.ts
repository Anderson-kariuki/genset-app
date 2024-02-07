import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CustomInterceptor implements HttpInterceptor {

  constructor() { }
// this interceptor gets the access tocken for authentication and places it ahead of every request
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const localToken = localStorage.getItem('token');
    request = request.clone({ headers: request.headers.set('Authorization', 'bearer' + localToken) });
    return next.handle(request);
  }
}
