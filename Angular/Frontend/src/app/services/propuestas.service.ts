import { Injectable } from '@angular/core';
import { Propuesta } from '../interfaces/propuesta';
import { Actividad } from '../interfaces/actividad';
import { BehaviorSubject, Observable, of } from 'rxjs'
import { HttpClient, HttpResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class PropuestasService {

  prop : Propuesta = { _id: "0", titulo: 'Tarjeta 0', descripcion: 'Descripcion de la tarjeta 0', actividades: [], imagen: "#" };
  proppp: Observable<Propuesta> = of(this.prop);

  private propuestaActual: Propuesta = { _id: "0", titulo: 'Tarjeta 0', descripcion: 'Descripcion de la tarjeta 0', actividades: [], imagen: "#" };

  private propuestaActualSubject = new BehaviorSubject<Propuesta>(this.propuestaActual);
  propuestaActual$: Observable<Propuesta> = this.propuestaActualSubject.asObservable();
  private url = "http://localhost:3000"

  constructor(private http: HttpClient, private cookies: CookieService, private socket: SocketService) {
  }

  // Método encargado de brindar todas las propuestas de un usuario
  obtenerPropuestas(): Observable<Propuesta[]> {
    let devolver = this.http.get<Propuesta[]>("http://localhost:3000/user/propuesta");
    return devolver;
  }
  obtenerActividades(): Observable<Actividad[]> {
    return this.http.get<Actividad[]>(`http://localhost:3000/actividades`);
  }

  obtenerPropuesta(propuestaId: string): Observable<Propuesta> {
    return this.http.get<Propuesta>(`http://localhost:3000/user/propuesta/${propuestaId}`);
  }

  obtenerActividad(id: string): Observable<Actividad> {
    return this.http.get<Actividad>(`http://localhost:3000/actividades/${id}`);
  }
  


  agregarPropuesta(url: string,titulo: string, descripcion: string, imagen: string,listaActividades:Actividad[]) {
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

  agregarActividad(titulo: string, descripcion: string, imagen: string | undefined) { 
    /*
      Acá se deberá conectar con back y agregar una actividad a la lista
    */
  }

  eliminarPropuesta(id: string) {
    let url = this.url + "/user/propuesta/"+ id
    return this.http.delete(url,{ observe: 'response' }).subscribe(
      (response: HttpResponse<any>) => {
        console.log(response)
      },
      (error: HttpResponse<any>) => {
        console.log("Hubo un error en el camino " + error)
      }
    );
}

  eliminarActividad(idActividad: string, idPropuesta: string) {
    
  }

  verDetalles(id: string) {
    console.log("el id es:" + id)
    this.obtenerPropuestas().subscribe((propuestas: Propuesta[]) => {
      const propuestaEncontrada = propuestas.find(p => p._id === id);
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

  guardarCambiosPropuesta(url: string, titulo: string, desc: string, img: string, _id: any, actividades: Actividad[]): Observable<any> {

    let dato = {
      propuesta:{
        _id: _id,
        titulo: titulo,
        descripcion: desc,
        imgage: img,
        actividades: actividades
      }
    }
    return this.http.put(url, dato)
  }

  obtenerTodasLasActividades(): Observable<Actividad[]>{
    return this.http.get<Actividad[]>(`http://localhost:3000/actividades/`);
  }



  crearActividad(nombre: string, descripcion: string, imagen: any){
    let body ={
      actividad:{
        _id:"seba",
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

  
  crearSala(datos: any): Observable<any> {
    console.log("Ver lo que e envía")
    console.log(datos)
    return this.http.post("http://localhost:3000/salas/", datos);
  }

  unirseSala(codigoSala: string){
    this.socket.unirseJuegoComoAdmin(codigoSala)
  }


  iniciarJuego(){
    this.socket.iniciarJuego()
  }

}