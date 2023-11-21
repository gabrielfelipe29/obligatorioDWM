import { Injectable } from '@angular/core';
import { Jugador } from '../interfaces/jugador';
import { Observable, of } from 'rxjs';
import { SocketService } from './socket.service';
import { Propuesta } from '../interfaces/propuesta';
import { HttpClient } from '@angular/common/http';
import { Actividad } from '../interfaces/actividad';
import { CookieService } from 'ngx-cookie-service';
import {ResultadoPropuesta} from '../interfaces/resultadoPropuesta'


@Injectable({
  providedIn: 'root'
})
export class JuegoService {

  constructor(private http: HttpClient, private cookies: CookieService) { }

  jugadores: Jugador[] = [];

  actividadActual: Actividad = new Actividad("", "", "", "")

  yaEstaEnSala = false

  esUltima: boolean = false

  public resultadoPropuesta: ResultadoPropuesta = new ResultadoPropuesta({}, {}, {})

  getEsUltima(){
    return of(this.esUltima)
  }

  getActividadActual(): Observable<Actividad> {
    return of(this.actividadActual)
  }




  getJugadores(): Observable<Jugador[]> {
    const juadoresConst = of(this.jugadores);
    return juadoresConst;
  }

  agregarJugador(alias: string) {
    this.jugadores.push(new Jugador(alias))
  }

  establecerJugadores(listaJugadores: any) {
    this.jugadores = []
    for (let elemento of listaJugadores) {
      this.jugadores.push(new Jugador(elemento.pseudonimo))
    }
  }

  quitarJugador(alias: string) {
    this.jugadores = this.jugadores.filter(elemento => elemento.psudonimo == alias);
  }

  entrarASalaEspera() {
    this.yaEstaEnSala = true
  }



  obtenerCodigoPropuesta() {
    return this.cookies.get("nombreCanal")
  }

  crearSala(datos: any): Observable<any> {
    return this.http.post("http://localhost:3000/salas/", datos);
  }

  setActividad(idActividad: string, actvidadTitulo: string, actvidadDescripcion: string, actvidadImagen: string) {
    this.actividadActual = new Actividad(idActividad, actvidadTitulo, actvidadDescripcion, actvidadImagen)
  }

  votarActividad(resultados: number[]): Observable<any> {
    let data = {
      jugador: {
        id: this.cookies.get("aliasJugador"),
        ranking: {
          meGusta: resultados[0],
          noMeGusta: resultados[1],
          meDaIgual: resultados[2]
        }
      }
    }
    let codigoSala = this.cookies.get("nombreCanal")
    let codigoActividad = this.actividadActual._id
    let ruta = "http://localhost:3000/salas/" + codigoSala + "/actividad/" + codigoActividad
    return this.http.post(ruta, data)

  }

  setResultadosActividad(meGustas: string, noMeGusta: string, meDaIgual: string) {
    try {
      this.actividadActual.establecerResultado(parseInt(meGustas), parseInt(noMeGusta), parseInt(meDaIgual))

    } catch (error) {
      console.log("Hubo un error haciendo el parse de un tipo de dato a otro")
    }
  }

  getResultadosActividad(): object{
    return this.actividadActual.obtenerResultados()
  }

  setRanking(primero: any, segundo: any, tercero: any){
    let p = null
    let s = null
    let t = null
    if(primero != undefined){
      p = primero
    }

    if(segundo != undefined){
      s = segundo
    }

    if(tercero != undefined){
      t = tercero
    }
    this.resultadoPropuesta = new ResultadoPropuesta(p, s, t)
  }

  obtenerRanking(){
    return this.resultadoPropuesta
  }




}
