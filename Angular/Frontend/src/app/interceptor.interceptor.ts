import { Injectable } from '@angular/core';
import {LoginService} from './log-in.service.ts'

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService) {}

intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.loginService.estaLogeado()) {
      const reqCopy = request.clone({
        setHeaders: {
          'authorization': 'Bearer ' + this.loginService.getToken(),
        },
      })
      console.log(reqCopy)
      return next.handle(reqCopy);

    } else {
      return next.handle(request);
    }


  }
