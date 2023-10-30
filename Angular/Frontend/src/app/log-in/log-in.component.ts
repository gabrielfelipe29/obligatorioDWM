import { Component } from '@angular/core';
import { LogInService } from '../log-in.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
<<<<<<< HEAD
  constructor(private loginService: LogInService, private router: Router) { }
=======
  constructor(private servicioRegistro: LogInService, private router: Router) { }
>>>>>>> 30d1f179ea86c737f93af96035a3fe7198f30259

  user = ""
  password = ""

  userValid: Boolean = true
  passValid: Boolean = true

<<<<<<< HEAD
  signup(){
    this.router.navigate(['/registro']);
=======
  unirseAlJuego() { }

  async onSubmit(form: NgForm) {

    /* Va a recibir un array de bools, si tiene dos y ambos están en true, significa que esta todo bien
    en caso contrario paso algo */
    console.log(this.servicioRegistro.hacerSolicitudPOST())
    //let result = await this.servicioRegistro.login(form.value.usuario, form.value.contraseña);

    /* Como estba pensado para poner un aviso de contraseña o usuario incorrecto */
    /* if (response.length == 2) {
      this.userValid = response[0]
      this.userValid = response[1]

    } else {
      alert("Ocurrio un error al enviar los datos al servidor, por favor repita el proceso")
    } */

 /*    console.log(result[0])
    if(result[0]) {
      this.router.navigate(['/inicio']);
    } else {
      alert("Usuario invalido")
    } */

   /*  if (this.userValid && this.passValid) {
      // Continuar con la vista del administrador
    } */
>>>>>>> 30d1f179ea86c737f93af96035a3fe7198f30259
  }

  login() {
    const user = { id: this.user, contraseña: this.password };
    this.loginService.login(user).subscribe(
      data => {
        if (data && data.token) {
          console.log(data)
          this.loginService.setToken(data.token);
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

  /* Para mi esta función no debería de estar acá, pero luego lo arreglamos */
  unirseAlJuego(){}
}
