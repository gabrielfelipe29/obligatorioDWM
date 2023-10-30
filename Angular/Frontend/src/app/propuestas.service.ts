
import { Injectable } from '@angular/core';
import { Propuesta } from './propuesta';
import { Actividad } from './actividad';
import { Observable, of } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class PropuestasService {
  constructor() { }

  obtenerPropuestas(): Observable<Propuesta[]> {
    /*
      Acá se deberá conectar con back y pedir la lista de propuestas
    */
    //Lo siguiente es momentaneo 
    let propuestas: Propuesta[] = [
      { id: 1, titulo: 'Tarjeta 1', descripcion: 'Descripcion de la tarjeta 1', actividades: [], creatorId: "usuario_1" },
      { id: 2, titulo: 'Tarjeta 2', descripcion: 'Descripcion de la tarjeta 2', actividades: [], creatorId: "usuario_1" },
      { id: 3, titulo: 'Tarjeta 3', descripcion: 'Descripcion de la tarjeta 3', actividades: [], creatorId: "usuario_1" }
    ];
    
    return of(propuestas);
  }

  obtenerActividades(): Observable<Actividad[]> {
    /*
      Acá se deberá conectar con back y pedir la lista de actividades
    */
      let actividades: Actividad[] = [
        { id: 1, nombre: 'Tarjeta 1', descripcion: 'Descripcion de la tarjeta 1', imagen: "#" },
        { id: 2, nombre: 'Tarjeta 2', descripcion: 'Descripcion de la tarjeta 2', imagen: "#" },
        { id: 3, nombre: 'Tarjeta 3', descripcion: 'Descripcion de la tarjeta 3', imagen: "#" }
      ];
      
      return of(actividades);
  }
  
  obtenerPropuesta(id: number): Observable<Propuesta> {
    /*
      Acá se deberá conectar con back y pedir la propuesta deseada
    */
    return of()
  }

  obtenerActividad(id: number): Observable<Actividad> {
    /*
      Acá se deberá conectar con back y pedir la propuesta deseada
    */
   return of()
  }
  

  agregarPropuesta(titulo: string, descripcion: string, imagen: string){
    /*
      Acá se deberá conectar con back y agregar una propuesta a la lista, 
      la lista de 
    */
  }

  agregarActividad(titulo: string, descripcion: string, imagen: string){
    /*
      Acá se deberá conectar con back y agregar una actividad a la lista
    */
  }

  eliminarPropuesta(id : number){
    /*
      Acá se deberá conectar con back y eliminar una propuesta a la lista
    */
  }

  eliminarActividad(id : number){
    /*
      Acá se deberá conectar con back y eliminar una actividad a la lista
    */
  }
}