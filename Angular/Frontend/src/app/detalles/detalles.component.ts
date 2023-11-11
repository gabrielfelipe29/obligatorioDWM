import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Propuesta } from '../propuesta';
import { Actividad } from '../actividad';
import { PropuestasService } from '../propuestas.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent {

  propuestaActual: Propuesta; 

  constructor(private route: ActivatedRoute, private router: Router, private servicio: PropuestasService) {
    this.propuestaActual= { id: 0, titulo: 'Tarjeta 0', descripcion: 'Descripcion de la tarjeta 0', actividades: [], imagen: "#" };
  }

  titulo = ""
  descripcion = ""
  imagen = ""

  actividadSeleccionada?: Actividad;



  actividades: Actividad[] = [];

  ngOnInit() {
    this.servicio.propuestaActual$.subscribe(
      propuesta => this.propuestaActual = propuesta
    );
    this.servicio.obtenerPropuestas().subscribe((propuestas: Propuesta[]) => {
      const propuestaEncontrada = propuestas.find(p => p.id === this.propuestaActual.id);
      if (propuestaEncontrada) {
        this.propuestaActual = propuestaEncontrada;
        
        // Imprimir nombres de las actividades
        if (this.propuestaActual.actividades) {
          this.propuestaActual.actividades.forEach(actividad => {
            console.log('Nombre de la actividad:', actividad.nombre);
          });
          this.actividades = this.propuestaActual.actividades;
        } else {
          console.log('La propuesta no tiene actividades.');
        }
    
        // Resto del código...
      } else {
        console.log("Propuesta no encontrada");
      }
      console.log("el nombre es :" + this.propuestaActual?.titulo);
    });
  }


  onSelect(actividad: Actividad): void {
    this.actividadSeleccionada = actividad;
  }


  mostrarform = false;

  toggleFormulario() {
    this.mostrarform = !this.mostrarform;
  }

  onSubmit(form: NgForm) {
    this.servicio.agregarActividad(form.value.titulo, form.value.descripcion, form.value.imagen)
  }

  Delete(idActividad: number): void {
    this.servicio.eliminarActividad(idActividad, this.propuestaActual?.id)
  }

  guardarCambios() {
    this.servicio.guardarCambiosPropuesta("http://localhost:3000/propuesta", this.titulo, this.descripcion, this.imagen)
  }

}