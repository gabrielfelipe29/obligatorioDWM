import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LogInService } from '../log-in.service';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css']
})
export class SingUpComponent {

  constructor(private servicioRegistro:LogInService){}
  user = ""
  pass = ""

  userValid = true
  passValid = true

  userReasonsInvalid: string[] = [];
  passReasonsInvalid: string[] = [];

  showUserInvalidMessage(){
    let message = "  s"
    for ( let reason of this.userReasonsInvalid) {
      message += reason + ", "
    }
    message = message.slice(0, message.length -2)
    console.log(message)
    return message
  }

  showPassInvalidMessage(){
    let message = "  "
    for ( let reason of this.passReasonsInvalid) {
      message += reason + ", "
    }
    message = message.slice(0, message.length -2)
    console.log(message)
    return message
  }

  onSubmit(form: NgForm) {

    this.userReasonsInvalid.splice(0, this.userReasonsInvalid.length);
    this.passReasonsInvalid.splice(0, this.passReasonsInvalid.length);

    let expresionCompleta  = "^[A-Za-z0-9]$"
    let expresion1 = "[a-z]"
    let expresion2 = "[A-Z]"
    let expresion3 = "[0-9]"

    let regExp = new RegExp(expresionCompleta)
    let regExp1 = new RegExp(expresion1)
    let regExp2= new RegExp(expresion2)
    let regExp3 = new RegExp(expresion3)


    // Esto no si es necesario o por Property Binding ya queda cargado el valor pero bueno
    this.user = form.value.usuario
    this.pass = form.value.contraseña

    this.userValid = (regExp1.test(this.user) ||  regExp2.test(this.user)) && regExp3.test(this.user)
    this.passValid = regExp.test(this.pass)

    if (!this.passValid){

      if(!regExp1.test(this.pass)){
        this.passReasonsInvalid.push(" faltan minúsculas ")
      } 
      if(!regExp2.test(this.pass)){
        this.passReasonsInvalid.push(" faltan mayusculas ")
      } 
      if(!regExp3.test(this.pass)){
        this.passReasonsInvalid.push(" faltan numeros ")    
      } 
      
    }

    if (!this.userValid){
      if (!(regExp1.test(this.user) ||  regExp2.test(this.user))) {
        this.userReasonsInvalid.push(" faltan letras")
      }
      if (!regExp3.test(this.user)) {
        this.userReasonsInvalid.push(" faltan numeros ")
      }
    }

    if (this.userValid && this.passValid) {
      this.servicioRegistro.singUp(this.user, this.pass);
    }
  }
}
