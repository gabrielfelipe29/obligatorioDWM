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
  constructor(private servicioRegistro: LogInService, private router: Router) { }

  user = ""
  pass = ""

  userValid: Boolean = true
  passValid: Boolean = true

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
  }
}
