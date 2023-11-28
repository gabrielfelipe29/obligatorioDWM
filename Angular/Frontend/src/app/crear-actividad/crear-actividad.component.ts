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


    //this.servicio.crearActividad(form.value.titulo, form.value.descripcion, form.value.imagen)

    const reader = new FileReader();
    if (document.getElementById('imagen') != null) {
      let file = (<HTMLInputElement>document.getElementById('imagen')).files[0];
      if (file == null) {
        this.servicio.crearActividad(form.value.titulo, form.value.descripcion, "")
        this.titulo = "";
        this.descripcion = "";
        this.imagen = "";

      }
      reader.addEventListener(
        "load",
        () => {
          // convert image file to base64 string
          console.log(reader.result)
          this.servicio.crearActividad(form.value.titulo, form.value.descripcion, reader.result)
          this.titulo = "";
          this.descripcion = "";
          this.imagen = "";
        },
        false,
      );

      if (file) {
        reader.readAsDataURL(file);
      }
    } else {
      this.servicio.crearActividad(form.value.titulo, form.value.descripcion, "")
      this.titulo = "";
      this.descripcion = "";
      this.imagen = "";
    }

    alert("¡Tu actividad fue creada con exito!")


  }


}
