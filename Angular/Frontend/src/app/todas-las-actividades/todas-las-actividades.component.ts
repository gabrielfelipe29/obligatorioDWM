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

  constructor(private servicio: PropuestasService) {}

  ngOnInit(): void {
    /*
    this.servicio.obtenerTodasLasActividades().subscribe((data) => {
      this.actividades = data;
    });
    */
  }

  agregarAPropuesta(actividad: Actividad): void {
    // Agrega la lógica para agregar elementos a otra lista aquí
  }

  mostrarDetalles (item: any): void {
    this.actividadSeleccionada = item;
  }
}
