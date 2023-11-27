import { Component } from '@angular/core';
import { Actividad } from '../interfaces/actividad';
import { PropuestasService } from '../services/propuestas.service';


@Component({
  selector: 'app-veractividades',
  templateUrl: './veractividades.component.html',
  styleUrls: ['./veractividades.component.css']
})
export class VeractividadesComponent {
  constructor(private servicio: PropuestasService){}
  actividades=this.servicio.obtenerActividades;
}