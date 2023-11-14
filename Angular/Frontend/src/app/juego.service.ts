import { Injectable } from '@angular/core';
import { Jugador } from './jugador';
import { Observable, of } from 'rxjs';
import { SocketService } from './socket.service';
import { Propuesta } from './propuesta';
import { HttpClient } from '@angular/common/http';
import { Actividad } from './actividad';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class JuegoService {

  constructor(private socketService: SocketService, private http: HttpClient, private cookies: CookieService) { }

  jugadores: Jugador[] = [];

  actividadActual: Actividad = new Actividad(0, "", "", "")

  yaEstaEnSala = false

  contador: number = 30

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

  quitarJugador(alias: string) {
    this.jugadores = this.jugadores.filter(elemento => elemento.psudonimo == alias);
  }

  entrarASalaEspera() {
    this.yaEstaEnSala = true
  }

  iniciarJuego() {
    this.socketService.iniciarJuego()
  }

  obtenerCodigoPropuesta() {
    return this.socketService.getCanal()
  }

  crearSala(datos: any): Observable<any> {
    return this.http.post("http://localhost:3000/salas/", datos);
  }

  setActividad(idActividad: string, actvidadTitulo: string, actvidadDescripcion: string, actvidadImagen: string) {
    this.actividadActual = new Actividad(Number(idActividad), actvidadTitulo, actvidadDescripcion, actvidadImagen)
  }

  votarActividad(resultados: number[]) {
    let data = {
      "jugador": {
        "id": this.cookies.get("aliasJugador"),
        "ranking": {
          "meGusta": resultados[0],
          "noMeGusta": resultados[1],
          "meDaIgual": resultados[2]
        }
      }
    }
    let codigoSala = this.socketService.getCanal()
    let codigoActividad = this.actividadActual.id
    let ruta = "/" + codigoSala + "/actividad/" + codigoActividad
    return this.http.post(ruta, data)

  }


}
