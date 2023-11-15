import { Component, OnInit } from '@angular/core';
import { PropuestasService } from '../propuestas.service';
import { Actividad } from '../actividad';

@Component({
  selector: 'app-todas-las-actividades',
  templateUrl: './todas-las-actividades.component.html',
  styleUrls: ['./todas-las-actividades.component.css']
})
export class TodasLasActividadesComponent implements OnInit {
  actividades: Actividad[]= [];
  actividadSeleccionada?: Actividad;
  propuestaId: number = 0;
  actividadesAAgregar: Actividad[] = []

  constructor(private servicio: PropuestasService) {}

  ngOnInit(): void {
    /*
    this.servicio.obtenerTodasLasActividades().subscribe((data) => {
      this.actividades = data;
    });
    */
   this.actividades = [{
    "id": 1,
    "nombre": "Actividad 1",
    "descripcion": "Descripción de la Actividad 1",
    "imagen": "#"
  },
  {
    "id": 2,
    "nombre": "Actividad 2",
    "descripcion": "Descripción de la Actividad 2",
    "imagen": "#"
  }]

  this.propuestaId = this.servicio.obtenerPropuestaActual().id;

  }

  agregarALista (actividad: Actividad){

  }

  retirarDeLista (actividad: Actividad){
    
  }

  agregarAPropuesta(actividad: Actividad): void {
    this.servicio.agregarActividad(actividad.nombre, actividad.descripcion, actividad.imagen);
  }

  mostrarDetalles (item: any): void {
    this.actividadSeleccionada = item;
  }
}