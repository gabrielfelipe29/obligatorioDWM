import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Propuesta } from '../propuesta';
import { Actividad } from '../actividad';
import { PropuestasService } from '../propuestas.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent {

  propuestaActual: Propuesta; 

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private servicio: PropuestasService) {
    this.propuestaActual= { id: "0", titulo: 'Tarjeta 0', descripcion: 'Descripcion de la tarjeta 0', actividades: [], imagen: "#" };
  }

  titulo = ""
  descripcion = ""
  imagen = ""

  actividadSeleccionada?: Actividad;


  // Lista de actividades de la propuesta
  actividades: Actividad[] = [];

  // Lista de actividades existentes
  actividadesExistentes: Actividad[] = [];

  ngOnInit() {
    this.servicio.propuestaActual$.subscribe(
      propuesta => this.propuestaActual = propuesta
    );
    this.servicio.obtenerPropuestas().subscribe((propuestas: Propuesta[]) => {
      const propuestaEncontrada = propuestas.find(p => p.id === this.propuestaActual.id);
      if (propuestaEncontrada) {
        this.propuestaActual = propuestaEncontrada;
        if (this.propuestaActual.actividades) {
          this.propuestaActual.actividades.forEach(actividad => {
            console.log('Nombre de la actividad:', actividad.titulo);
          });
          this.actividades = this.propuestaActual.actividades;
        } else {
          console.log('La propuesta no tiene actividades.');
        }
      } else {
        console.log("Propuesta no encontrada");
      }
    });

    this.obtenerTodasLasActividades()
  }

  obtenerTodasLasActividades(): void {
    this.servicio.obtenerTodasLasActividades()
      .subscribe(
        (data: Actividad[]) => {
          this.actividadesExistentes = data;
          console.log(data);
        },
        error => {
          console.error('Error al obtener actividades:', error);
        }
      );
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

  Delete(idActividad: string): void {
    this.servicio.eliminarActividad(idActividad, this.propuestaActual?.id)
  }

  guardarCambios() {
    this.servicio.guardarCambiosPropuesta("http://localhost:3000/propuesta", this.titulo, this.descripcion, this.imagen, this.propuestaActual.id, this.actividades)
  }

  agregarALista (actividad: Actividad){

  }

  retirarDeLista (actividad: Actividad){
    
  }

  agregarAPropuesta(actividad: Actividad): void {
    this.servicio.agregarActividad(actividad.titulo, actividad.descripcion, actividad.imagen);
  }

  mostrarDetalles (item: any): void {
    this.actividadSeleccionada = item;
  }
}