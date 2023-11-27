import { Component } from '@angular/core';
import { PropuestasService } from '../services/propuestas.service';
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
      alert("¡Tu actividad fue creada con exito!")
      this.titulo= "";
      this.descripcion= "";
      this.imagen = "";
    }
  }

/*
export class CrearActividadComponent {

<form (ngSubmit)="crearPropuesta()">
    <div>
        <label for="titulo">Título:</label>
        <input type="text" id="titulo" name="titulo" [(ngModel)]="titulo" required>
    </div>
    <div>
        <label for="descripcion">Descripción:</label>
        <textarea id="descripcion" name="descripcion" [(ngModel)]="descripcion" required></textarea>
    </div>
    <button type="submit">Crear Propuesta</button>
</form>
}
*/
