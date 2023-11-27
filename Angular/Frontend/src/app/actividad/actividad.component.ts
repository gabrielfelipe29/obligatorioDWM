import { Actividad } from '../interfaces/actividad';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PropuestasService } from '../services/propuestas.service';


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
    let id = "";
  
    const idFromRoute = this.route.snapshot.paramMap.get('id');
    if (idFromRoute !== null) {
      id = idFromRoute;
    }
  
    this.servicio.obtenerActividad(id)
      .subscribe(actividad => this.actividad = actividad);
  }
}

/*
export class CrearPropuestaComponent {
  titulo?: string;
  descripcion?: string;
  actividadesSeleccionadas: string[] = [];
  listaguardar:Actividad[]=[]
  constructor(private servicio: PropuestasService){}
  //listaActividades=this.servicio.obtenerActividades;
  
  this.servicio.().subscribe(listaActividades=> {
    this.propuestas = listaActividades;
  };
  
  agregaractividad(actividad:Actividad) {
    this.actividadesSeleccionadas.push(actividad.nombre)
    this.listaguardar.push(actividad);
  }

}
*/
