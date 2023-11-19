
import { Injectable } from '@angular/core';
import { Propuesta } from './propuesta';
import { Actividad } from './actividad';
import { BehaviorSubject, Observable, of } from 'rxjs'
import { HttpClient, HttpResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class PropuestasService {

  prop : Propuesta = { id: "0", titulo: 'Tarjeta 0', descripcion: 'Descripcion de la tarjeta 0', actividades: [], imagen: "#" };
  proppp: Observable<Propuesta> = of(this.prop);

  private propuestaActual: Propuesta = { id: "0", titulo: 'Tarjeta 0', descripcion: 'Descripcion de la tarjeta 0', actividades: [], imagen: "#" };

  private propuestaActualSubject = new BehaviorSubject<Propuesta>(this.propuestaActual);
  propuestaActual$: Observable<Propuesta> = this.propuestaActualSubject.asObservable();
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
  
  obtenerActividades(idPropuesta: string): Observable<Actividad[]> {

    return of();
  }

  obtenerPropuesta(propuestaId: string): Observable<Propuesta> {
    return this.http.get<Propuesta>(`http://localhost:3000/user/propuesta/${propuestaId}`);
  }

  obtenerActividad(id: string): Observable<Actividad> {
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

  eliminarPropuesta(id: string): Observable<any> {
      let url = this.url + "/propuesta/"+ id
      return this.http.delete(url)
  }

  eliminarActividad(idActividad: string, idPropuesta: string) {
    
  }

  verDetalles(id: string) {
    console.log("el id es:" + id)
    this.obtenerPropuestas().subscribe((propuestas: Propuesta[]) => {
      const propuestaEncontrada = propuestas.find(p => p.id === id);
      if (propuestaEncontrada) {
        this.prop = propuestaEncontrada;
        this.propuestaActual = propuestaEncontrada;
        this.propuestaActualSubject.next(propuestaEncontrada);
      } else {
        console.log("Propuesta no encontrada");
      }
      console.log("el nombre es :" + this.propuestaActual?.titulo)
    });
  }

  obtenerPropuestaActual() {
    return this.prop;
  }

  guardarCambiosPropuesta(url: string, titulo: string, desc: string, img: string, id: any, actividades: Actividad[]) {

    let dato = {
      id: id,
      tittle: titulo,
      description: desc,
      imgage: img,
      actividades: actividades
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

  obtenerTodasLasActividades(): Observable<Actividad[]>{
    return this.http.get<Actividad[]>(`http://localhost:3000/actividades/`);
  }

  crearPropuesta(ombre: string, descripcion: string, imagen: string){

  }

  crearActividad(nombre: string, descripcion: string, imagen: string){
    let body ={
      actividad:{
        id:"seba",
        titulo: nombre,
        descripcion: descripcion,
        imagen: imagen
      }
    }
    

    let datos = JSON.stringify(body)
    this.http.post(this.url+'/actividades/', body,{ observe: 'response' }).subscribe(
      (response: HttpResponse<any>) => {
        console.log(response)
      },
      (error: HttpResponse<any>) => {
        console.log("Hubo un error en el camino " + error)
      }
    );
  }
}