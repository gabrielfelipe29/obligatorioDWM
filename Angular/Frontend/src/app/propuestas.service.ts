import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { Propuesta } from './propuesta';
import { Actividad } from './actividad';
import { Observable, of } from 'rxjs'
import { __param } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class PropuestasService {
  constructor(private http: HttpClient,  private cookies: CookieService) { }

  public propuestaActual? :number;

  obtenerPropuestas(userId:string): Observable<Propuesta[]> {
    /*
      Acá se deberá conectar con back y pedir la lista de propuestas
    */
    return this.http.get<Propuesta[]>(`http://localhost:3000/user/${userId}`);
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
      let listaActividades = [
        {id: 1, nombre: "Actividad 1", descripcion: "Primera actividad", imagen: "#"},
        {id: 2, nombre: "Actividad 2", descripcion: "Segunda actividad", imagen: "#"},
        {id: 3, nombre: "Actividad 3", descripcion: "Tercera actividad", imagen: "#"}
      ]; 
    
      
      return of(listaActividades);
  }
  
  obtenerPropuesta(userId: number, propuestaId: number): Observable<Propuesta> {
    return this.http.get<Propuesta>(`http://localhost:3000/user/${userId}/propuesta/${propuestaId}`);
  }

  obtenerActividad(id: number): Observable<Actividad> {

    return this.http.get<Actividad>(`http://localhost:3000/user/${id}`)
  
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

  eliminarPropuesta(id: number){
    /*
      Acá se deberá conectar con back y eliminar una propuesta a la lista
    */
  }

  eliminarActividad(idActividad: number, idPropuesta: number ){
    /*
      Acá se deberá conectar con back y eliminar una actividad a la lista
    */
  }
}