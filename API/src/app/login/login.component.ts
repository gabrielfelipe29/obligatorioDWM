import { Component } from "@angular/core";
import { UsersService } from "../user.service";
import { Router } from "@angular/router"

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  email: String = "";
  password: String = "";

  constructor(public userService: UsersService, private router: Router) {}

  login() {
    const user = { id: this.email, contraseña: this.password };
    this.userService.login(user).subscribe(
      data => {
        console.log(data)
        this.userService.setToken(data.token);
        this.router.navigateByUrl('/');
      },
      error => {
        console.log(error);
      });
  }
}