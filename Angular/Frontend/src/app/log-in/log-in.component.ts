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

  onSubmit(form: NgForm) {
    this.servicioRegistro.login(form.value.usuario, form.value.contraseña);
  }
}
