import { AppRoutingModule } from "./app-routing.module";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
/* import { RegisterComponent } from "./register/register.component"; */
import { HttpClientModule } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";

@NgModule({
  declarations: [AppComponent, LoginComponent, /* RegisterComponent */],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}