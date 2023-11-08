
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
  private url = "http://localhost:3000"

  constructor(private client: HttpClient) {
  }

  obtenerPropuestas(idUsuario: string): Observable<Propuesta[]> {

    let devolver = this.client.get<Propuesta[]>("http://localhost:3000/user/:idUsuario");
    return devolver;
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

  eliminarPropuesta(id: number): Observable<any> {
    /*
      Acá se deberá conectar con back y eliminar una propuesta a la lista
    */
      let url = this.url + id
      return this.client.delete(url)
  }

  eliminarActividad(idActividad: number, idPropuesta: number) {
    
  }

  verDetalles(id: number) {
    /*
    this.obtenerPropuestas().subscribe((propuestas: Propuesta[]) => {
      const propuestaEncontrada = propuestas.find(p => p.id === id);
      if (propuestaEncontrada) {
        this.propuestaActual = propuestaEncontrada;
      } else {
      }
    });
    */
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