import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
/* import { RegisterComponent } from "./register/register.component"; */



const routes = [
  { path: "", component: AppComponent },
  { path: "login", component: LoginComponent },
/*   { path: "register", component: RegisterComponent, pathMatch: "full" }, */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }