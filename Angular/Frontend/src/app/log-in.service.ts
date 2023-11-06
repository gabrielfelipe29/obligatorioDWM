import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { InterceptorInterceptor } from './interceptor.interceptor';

// Hay que usar npm install ngx-cookie-service --save 
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root",
})
export class LogInService {
  constructor(private http: HttpClient,  private cookies: CookieService) {}

  login(user: any): Observable<any> {
    return this.http.post("http://localhost:3000//user/login", user);
  }

  setToken(token: string) {
    this.cookies.set("token", token);
  }
  getToken() {
    return this.cookies.get("token");
  }

  singUp(user: String, pass: String){
    
  }
}
