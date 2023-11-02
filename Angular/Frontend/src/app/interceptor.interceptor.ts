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

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem("userLogeado") && localStorage.getItem("userLogeado") == "true") {
      const reqCopy  = request.clone()
      reqCopy.headers.set("Authorization", "Bear" + localStorage.getItem("tokenApp"))
    } 
    console.log("Contenido de la solicitud (request):", request);
    return next.handle(request);
    
  }
}
