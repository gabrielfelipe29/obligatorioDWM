import { HttpClient,HttpResponse} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { Propuesta } from './interfaces/propuesta';
import { Actividad } from './actividad';
import { __param } from 'tslib';

import { BehaviorSubject, Observable, of } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class PropuestasService {

  private propuestaActual: Propuesta = { id: 0, titulo: 'Tarjeta 0', descripcion: 'Descripcion de la tarjeta 0', actividades: [], imagen: "#" };

  private propuestaActualSubject = new BehaviorSubject<Propuesta>(this.propuestaActual);
  propuestaActual$: Observable<Propuesta> = this.propuestaActualSubject.asObservable();
  private url = "http://localhost:3000"
  constructor(private http: HttpClient, private cookies: CookieService) {
  }

  // Método encargado de brindar todas las propuestas de un usuario
  obtenerPropuestas(): Observable<Propuesta[]> {
    /*
      Acá se deberá conectar con back y pedir la lista de propuestas
    */

    return this.http.get<Propuesta[]>('http://localhost:3000/user/propuesta');
  }
    
    //Lo siguiente es momentaneo 
    /*let propuestas: Propuesta[] = [
      { id: 1, titulo: 'Tarjeta 1', descripcion: 'Descripcion de la tarjeta 1', actividades: [], creatorId: "usuario_1", imagen: "#" },
      { id: 2, titulo: 'Tarjeta 2', descripcion: 'Descripcion de la tarjeta 2', actividades: [], creatorId: "usuario_1", imagen: "#" },
      { id: 3, titulo: 'Tarjeta 3', descripcion: 'Descripcion de la tarjeta 3', actividades: [], creatorId: "usuario_1", imagen: "#" }
    ];

    return of(propuestas);
    */

  obtenerActividades(): Observable<Actividad[]> {
    /*
      Acá se deberá conectar con back y pedir la lista de actividades
    */

    return this.http.get<Actividad[]>(`http://localhost:3000/actividades`);
    

    /*
    let listaActividades = [
      { id: 1, nombre: "Actividad 1", descripcion: "Primera actividad", imagen: "#" },
      { id: 2, nombre: "Actividad 2", descripcion: "Segunda actividad", imagen: "#" },
      { id: 3, nombre: "Actividad 3", descripcion: "Tercera actividad", imagen: "#" }
    ];


    return of(listaActividades);
    */
  }
  
  obtenerPropuesta(propuestaId: number): Observable<Propuesta> {
    return this.http.get<Propuesta>(`http://localhost:3000/user/propuesta/${propuestaId}`);
  }

  obtenerActividad(id: number): Observable<Actividad> {
    return this.http.get<Actividad>(`http://localhost:3000/user/actividades/${id}`)
  }

  agregarPropuesta(url: string,titulo: string, descripcion: string, imagen: string,listaActividades:Actividad[]) {
    /*
      Acá se deberá conectar con back y agregar una propuesta a la lista, 
      la lista de 
    */
   let nuevapropuesta={
      propuesta: {
        titulo:titulo,
        descripcion:descripcion,
        img:imagen,
        actividades:listaActividades
    }
   }
   this.http.post(url,nuevapropuesta,{ observe: 'response' }).subscribe(
    (response: HttpResponse<any>) => {
      console.log(response)
    },
    (error: HttpResponse<any>) => {
      console.log("Hubo un error en el camino " + error)
    });
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
      return this.http.delete(url)
  }

  eliminarActividad(idActividad: number, idPropuesta: number) {
    
  }

  verDetalles(id: number) {
    console.log("el id es:" + id)
    this.obtenerPropuestas().subscribe((propuestas: Propuesta[]) => {
      const propuestaEncontrada = propuestas.find(p => p.id === id);
      if (propuestaEncontrada) {
        this.propuestaActual = propuestaEncontrada;
        this.propuestaActualSubject.next(propuestaEncontrada);
      } else {
        console.log("Propuesta no encontrada");
      }
      console.log("el nombre es :" + this.propuestaActual?.titulo)
    });
  }
  

  obtenerPropuestaActual() {
    return this.propuestaActualSubject.value;
  }

  guardarCambiosPropuesta(url: string, titulo: string, desc: string, img: string, actividad:Actividad[],id:any) {

    let dato = {
      propuesta:{
        id:id
      },
      title: titulo,
      description: desc,
      img: img,
      //binario a 
      actividad:actividad
    }

    let datos = JSON.stringify(dato)
    this.http.put(url, datos, { observe: 'response' }).subscribe(
      (response: HttpResponse<any>) => {
        console.log(response)
      },
      (error: HttpResponse<any>) => {
        console.log("Hubo un error en el camino " + error)
      }
    );
  }

  obtenerTodasLasActividades(){

  }
}