import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { InterceptorInterceptor } from '../interceptor.interceptor';

// Hay que usar npm install ngx-cookie-service --save 
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root",
})
export class LogInService {
  constructor(private http: HttpClient,  private cookies: CookieService) {}

  login(user: any): Observable<any> {
    return this.http.post("http://localhost:3000/user/login", user);
  }

  setToken(token: string) {
    this.cookies.set("token", token);
  }
  getToken() {
    return this.cookies.get("token");
  }

  estaLogeado(){
    return this.cookies.check("userID")
  }

  setUserData(user: string, password: string) {
    this.cookies.set("userID", user);
    /* this.cookies.set("userPassword", password); */
  }
  getUserData(){
    /* return { user: this.cookies.get("userID"), pass: this.cookies.get("userPassword")} */
    return { user: this.cookies.get("userID")}
  }

  logOut(){
    this.cookies.delete("userID");
    this.cookies.delete("token");
  }

 

  singUp(user: String, pass: String){
    
  }
}