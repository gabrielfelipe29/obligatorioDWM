import { Component } from '@angular/core';
import { LogInService } from '../services/log-in.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  constructor(private loginService: LogInService, private router: Router) { }

  user = ""
  password = ""

  userValid: Boolean = true
  passValid: Boolean = true

  signup(){
    this.router.navigate(['/registro']);
  }

  login() {
    const administrador = { administrador: { id: this.user, contraseña: this.password }};
    console.log(administrador)
    this.loginService.login(administrador).subscribe(
      data => {
        if (data && data.token) {
          console.log(data)
          this.loginService.setToken(data.token);
          this.loginService.setUserData(this.user, this.password);
          this.router.navigateByUrl('/inicio');
        } 
        
      },
      error => {
        if (error.status == 401) {
          alert("Error, contraseña incorrecta o usuario incorrecto")
        }

        if (error.status == 400) {
          alert("Error en el formato de los datos")
        }
        console.log(error);
      });
  }

}