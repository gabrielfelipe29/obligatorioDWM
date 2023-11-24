import { Component } from '@angular/core';
import { PropuestasService } from '../propuestas.service';
import { Propuesta } from '../propuesta';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-crear-actividad',
  templateUrl: './crear-actividad.component.html',
  styleUrls: ['./crear-actividad.component.css']
})
export class CrearActividadComponent {
  
  constructor(private servicio: PropuestasService){}

  titulo= "";
  descripcion= "";
  imagen = "";

  nombrevalido = false;
  

  onSubmit(form: NgForm) {
    this.servicio.crearActividad(form.value.titulo, form.value.descripcion, form.value.imagen)
  }
}