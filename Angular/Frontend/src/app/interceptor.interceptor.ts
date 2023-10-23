import * as jose from 'jose'
import { Injectable } from '@angular/core';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  usuarioLogeado = false; 
  token = ""

  setToken(token:string){
    this.token = token;
    this.usuarioLogeado = true
  }

  destroyToken(){
    this.token = ""
    this.usuarioLogeado = false
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.usuarioLogeado) {
      const reqCopy  = request.clone()
      reqCopy.headers.set("Authorization", "Bear" + this.token)
    } 

    return next.handle(request);
    
  }
}
