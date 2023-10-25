import { Component } from '@angular/core';
import { LogInService } from '../log-in.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  constructor(private servicioRegistro: LogInService) { }

  user = ""
  pass = ""

  userValid: Boolean = true
  passValid: Boolean = true

  unirseAlJuego() { }

  onSubmit(form: NgForm) {

    /* Va a recibir un array de bools, si tiene dos y ambos están en true, significa que esta todo bien
    en caso contrario paso algo */
    let response = this.servicioRegistro.login(form.value.usuario, form.value.contraseña);

    if (response.length == 2) {
      this.userValid = response[0]
      this.userValid = response[1]

    } else {
      alert("Ocurrio un error al enviar los datos al servidor, por favor repita el proceso")
    }

    if (this.userValid && this.passValid) {
      // Continuar con la vista del administrador
    }
  }
}
