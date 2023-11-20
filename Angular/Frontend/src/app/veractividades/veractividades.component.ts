import { Component } from '@angular/core';
import { Actividad } from '../actividad';
import { PropuestasService } from '../propuestas.service';

@Component({
  selector: 'app-veractividades',
  templateUrl: './veractividades.component.html',
  styleUrls: ['./veractividades.component.css']
})
export class VeractividadesComponent {
  constructor(private servicio: PropuestasService){}
  actividades=this.servicio.obtenerActividades;
}
