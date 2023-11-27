import { Component } from '@angular/core';
import { PropuestasService } from '../services/propuestas.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-crear-actividad',
  templateUrl: './crear-actividad.component.html',
  styleUrls: ['./crear-actividad.component.css']
})

export class CrearActividadComponent {
  
  constructor(private servicio: PropuestasService) { }

  titulo = "";
  descripcion = "";
  imagen = "";
  nombrevalido = false;

  onSubmit(form: NgForm) {

    const reader = new FileReader();
    debugger
    if (document.getElementById('imagen') != null) {
      let file = (<HTMLInputElement>document.getElementById('imagen')).files[0];

      reader.addEventListener(
        "load",
        () => {
          // convert image file to base64 string
          console.log(reader.result)
          this.servicio.crearActividad(form.value.titulo, form.value.descripcion, reader.result)
        },
        false,
      );

      if (file) {
        reader.readAsDataURL(file);
      }
    } else {
      this.servicio.crearActividad(form.value.titulo, form.value.descripcion, "")
    }

  }

}
