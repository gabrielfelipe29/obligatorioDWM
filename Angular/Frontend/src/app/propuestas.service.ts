
import { Injectable } from '@angular/core';
import { Propuesta } from './propuesta';
import { Actividad } from './actividad';
import { Observable, of } from 'rxjs'
import { HttpClient, HttpResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class PropuestasService {
  private propuestaActual?: Propuesta;
  private url = "http://localhost:3000"

  constructor(private http: HttpClient, private cookies: CookieService) {
  }

  // Método encargado de brindar todas las propuestas de un usuario
  obtenerPropuestas(): Observable<Propuesta[]> {
    let devolver = this.http.get<Propuesta[]>("http://localhost:3000/user/propuesta");
    return devolver;
  }
  /*  
    .then y despues el pipe 
  */
  
  obtenerActividades(idPropuesta: number): Observable<Actividad[]> {

    return of();
  }

  obtenerPropuesta(propuestaId: number): Observable<Propuesta> {
    return this.http.get<Propuesta>(`http://localhost:3000/user/propuesta/${propuestaId}`);
  }

  obtenerActividad(id: number): Observable<Actividad> {
    return this.http.get<Actividad>(`http://localhost:3000/user/actividades/${id}`);
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
      return this.http.delete(url)
  }

  eliminarActividad(idActividad: number, idPropuesta: number) {
    
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