import { Component, OnInit } from '@angular/core';
import { Actividad } from '../interfaces/actividad';
import { FormsModule } from '@angular/forms';
import { PropuestasService } from '../services/propuestas.service';
@Component({
  selector: 'app-crear-propuesta',
  templateUrl: './crear-propuesta.component.html',
  styleUrls: ['./crear-propuesta.component.css']
})
export class CrearPropuestaComponent implements OnInit {
  titulo="";
  descripcion="";
  imagen="";
  constructor(private servicio: PropuestasService){}
  actividadesSeleccionadas: string[] = [];
  listaguardar:any[]=[]
  lista: any[] = [];



  ngOnInit(): void {
    this.servicio.obtenerActividades().subscribe(listaActividades => {
      debugger
      this.lista= listaActividades;
    });
  }
    
  
  agregaractividad(actividad:Actividad) {
    let dato={
      _id: actividad._id,
      titulo:actividad.titulo,
      descripcion:actividad.descripcion,
      imagen:actividad.imagen
    }
    this.actividadesSeleccionadas.push(actividad.titulo)
    this.listaguardar.push(actividad);//guardar json
  }
  exitoGuardarCambios: boolean = false;

  guardarCambios() {
    this.servicio.agregarPropuesta("http://localhost:3000/user/propuesta",this.titulo, this.descripcion, this.imagen,this.listaguardar)
    // Mensaje de éxito
  alert("¡Tu propuesta se creó con éxito!");

  // Reiniciar los campos
  this.titulo = '';
  this.descripcion = '';
  this.imagen = '';
  this.actividadesSeleccionadas =[];
  this.listaguardar=[]
  }

}