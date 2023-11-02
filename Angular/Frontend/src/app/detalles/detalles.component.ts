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

  
  constructor(private route: ActivatedRoute, private router: Router, private servicio: PropuestasService) {
    const propuestaActual = this.servicio.propuestaActual;
    if (propuestaActual !== undefined) {
      this.idPropuesta = propuestaActual;
    } else {
      this.idPropuesta = 0; 
    }
  }

  idPropuesta : number = 0 
  titulo = ""
  descripcion = ""
  imagen = ""

  actividadSeleccionada?: Actividad;

  actividades: Actividad[] = [];
  
  ngOnInit() {
    this.obtenerActividades()
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

  Delete(idActividad: number):void{
  this.servicio.eliminarActividad(idActividad, this.idPropuesta)
  }
  
}