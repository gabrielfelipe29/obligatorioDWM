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

  constructor(private route: ActivatedRoute, private router: Router, private servicio: PropuestasService) {}
  
  titulo = ""
  descripcion = ""
  imagen = ""

  actividadSeleccionada?: Actividad;

  actividades: Actividad[] = [];
  listaActividades = [
    {id: 1, nombre: "Actividad 1", descripcion: "Primera actividad", imagen: "#"},
    {id: 2, nombre: "Actividad 2", descripcion: "Segunda actividad", imagen: "#"},
    {id: 3, nombre: "Actividad 3", descripcion: "Tercera actividad", imagen: "#"}
  ]; 


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

  Delete(id:number):void{
  this.servicio.eliminarActividad(id)
  }
}



/*
  ngOnInit() {
    
  }
  */