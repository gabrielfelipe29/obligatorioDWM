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
    const resultado = this.servicio.obtenerPropuestaActual();
    if (resultado !== undefined) {
      this.propuestaActual = resultado;
    } else {
      this.propuestaActual = { id: 0, titulo: 'Tarjeta 0', descripcion: 'Descripcion de la tarjeta 0', actividades: [], imagen: "#" };
    }
  }

  titulo = ""
  descripcion = ""
  imagen = ""

  actividadSeleccionada?: Actividad;

  actividades: Actividad[] = [];

  ngOnInit() {
    this.actividades = this.propuestaActual.actividades
  }


  onSelect(actividad: Actividad): void {
    this.actividadSeleccionada = actividad;
  }

  obtenerActividades(): void {
    this.servicio.obtenerActividades()
      .subscribe(actividades => this.actividades = actividades);
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