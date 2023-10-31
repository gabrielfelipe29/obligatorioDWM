
import { Injectable } from '@angular/core';
import { Propuesta } from './propuesta';
import { Actividad } from './actividad';
import { Observable, of } from 'rxjs'
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PropuestasService {
  private propuestaActual?: Propuesta;

  constructor(private client: HttpClient) {
  }

  obtenerPropuestas(): Observable<Propuesta[]> {
    /*
      Acá se deberá conectar con back y pedir la lista de propuestas
    */
    //Lo siguiente es momentaneo 
    let propuestas: Propuesta[] = [
      { id: 1, titulo: 'Tarjeta 1', descripcion: 'Descripcion de la tarjeta 1', actividades: [], creatorId: "usuario_1", imagen: "#" },
      { id: 2, titulo: 'Tarjeta 2', descripcion: 'Descripcion de la tarjeta 2', actividades: [], creatorId: "usuario_1", imagen: "#" },
      { id: 3, titulo: 'Tarjeta 3', descripcion: 'Descripcion de la tarjeta 3', actividades: [], creatorId: "usuario_1", imagen: "#" }
    ];

    return of(propuestas);
  }

  obtenerActividades(): Observable<Actividad[]> {
    /*
      Acá se deberá conectar con back y pedir la lista de actividades
    */
    let listaActividades = [
      { id: 1, nombre: "Actividad 1", descripcion: "Primera actividad", imagen: "#" },
      { id: 2, nombre: "Actividad 2", descripcion: "Segunda actividad", imagen: "#" },
      { id: 3, nombre: "Actividad 3", descripcion: "Tercera actividad", imagen: "#" }
    ];


    return of(listaActividades);
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


  agregarPropuesta(titulo: string, descripcion: string, imagen: string) {
    /*
      Acá se deberá conectar con back y agregar una propuesta a la lista, 
      la lista de 
    */
  }

  agregarActividad(titulo: string, descripcion: string, imagen: string) {
    /*
      Acá se deberá conectar con back y agregar una actividad a la lista
    */
  }

  eliminarPropuesta(id: number) {
    /*
      Acá se deberá conectar con back y eliminar una propuesta a la lista
    */
  }

  eliminarActividad(idActividad: number, idPropuesta: number) {
    /*
      Acá se deberá conectar con back y eliminar una actividad a la lista
    */
  }

  verDetalles(id: number) {
    this.obtenerPropuestas().subscribe((propuestas: Propuesta[]) => {
      const propuestaEncontrada = propuestas.find(p => p.id === id);
      if (propuestaEncontrada) {
        this.propuestaActual = propuestaEncontrada;
      } else {
      }
    });
  }

  obtenerPropuestaActual() {
    return this.propuestaActual;
  }

  guardarCambiosPropuesta(url: string, titulo: string, desc: string, img: string) {

    let dato = {
      tittle: titulo,
      description: desc,
      imgage: img
    }

    let datos = JSON.stringify(dato)
    this.client.put(url, datos, { observe: 'response' }).subscribe(
      (response: HttpResponse<any>) => {
        console.log(response)
      },
      (error: HttpResponse<any>) => {
        console.log("Hubo un error en el camino " + error)
      }
    );
  }
}