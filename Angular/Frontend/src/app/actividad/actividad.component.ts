import { Actividad } from '../actividad';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PropuestasService } from '../propuestas.service';


@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.css']
})
export class ActividadComponent {
  @Input() actividad?: Actividad;
  constructor(
    private route: ActivatedRoute,
    private servicio: PropuestasService,
    private location: Location
  ) {}


  ngOnInit(): void {
    this.obtenerActividad();
  }

  obtenerActividad(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.servicio.obtenerActividad(id)
      .subscribe(actividad => this.actividad = this.actividad);
  }
}