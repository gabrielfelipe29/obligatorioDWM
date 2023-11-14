import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";
import { LogInService } from './log-in.service';
import { Router } from "@angular/router";
import { JuegoService } from './juego.service';

@Injectable({
  providedIn: 'root',
})
export class SocketService {

  private socket: any;

  constructor(private cookies: CookieService, private logService: LogInService, private router: Router, private juegoService: JuegoService) {
    this.socket = io('http://localhost:3000'); // Reemplaza con la URL de tu servidor Node.js
  }


  ngOnInit() {


    /* Puedo usar varios canales a la vez, usando nombreCanal_algoMás, de esta forma, serán canales dinamicos, 
    lo cual hace más eficiente el socket */
    // Escuchar mensajes en un canal específico
    this.socket.on(this.getCanal(), (mensaje: any) => {

      // Recibimos un json
      if (mensaje.asunto !== undefined && mensaje.asunto == "actividad") {
        // Acá se redirige a actividad y se cargan los datos de la actividad
        this.juegoService.setActividad(mensaje.actividad.idActividad, mensaje.actvidad.titulo, mensaje.actvidad.descripcion, mensaje.actvidad.imagen)
        this.router.navigateByUrl('/actividad');

      }

      if (mensaje.asunto !== undefined && mensaje.asunto == "resultadosActividad") {
        // Aca llegan los resultados de la actividad
        // this.juegoService.setResultadosActividad(mensaje.resultado.meGusta, mensaje.resultado.noMeGusta, mensaje.resultado.meDaIgual)
        //this.router.navigateByUrl('/restultadoActividad');
      }

      if (mensaje.asunto !== undefined && mensaje.asunto == "ranking") {
        // Aca llegan los resultados de la propuesta como ta, el ranking de actividades
        // this.juegoService.setRanking()
        //this.router.navigateByUrl('/ranking');
      }

      // Por si se desconecta un usuario mientras están todos en la sala de espera
      if (mensaje.asunto !== undefined && mensaje.asunto == "jugadorAbandonoSalaEsperaJuego") {
        this.juegoService.quitarJugador(mensaje.alias)
      }

      if (mensaje.asunto !== undefined && mensaje.asunto == "esperaJuego") {
        this.cookies.set("qrCode", mensaje.qrCodeSalas)

        // Cuando se crea la sala también se une el admin, por lo cual alias va a estar "", en ese caso no se agrega jugador
        if (mensaje.alias != "") {
          this.juegoService.agregarJugador(mensaje.alias)
        }

        if (!this.juegoService.yaEstaEnSala) {
          this.router.navigateByUrl('/esperaJuego');
        }
      }

      console.log('Mensaje recibido:', mensaje);
    });

    this.socket.on("errores", (mensaje: any) => {
      alert(mensaje)
    });
  }

  /* Solo para los jugadores */

  unirseJuego(cod: string, pseu: string) {

    // Enviar un mensaje al servidor en un canal específico
    let datos = {
      rol: "player",
      codigo: cod,
      pseudonimo: pseu
    }
    this.cookies.set("aliasPlayer", pseu)
    // Unirse a un canal
    this.socket.emit('join', datos);
  }

  salirJuego() {
    // Salir del canal 
    this.socket.emit('salirJuego', this.getCanal());
    this.destruirCanal()

  }


  /* Esto solo si es admin */

  unirseJuegoComoAdmin(cod: string) {
    this.setCanal(cod)
    if (this.logService.estaLogeado()) {
      let datos = {
        rol: "player",
        codigo: cod,
        userID: this.logService.getUserData().user,
      }
      this.socket.emit('join', datos);
    }
  }

  iniciarJuego() {
    if (this.logService.estaLogeado()) {
      let datos = {
        adminID: this.logService.getUserData().user,
        codigoSala: this.getCanal()
      }
      this.socket.emit('iniciarJuego', datos);

    }
  }

  mostrarSiguienteActividad() {
    if (this.logService.estaLogeado()) {
      let datos = {
        adminID: this.logService.getUserData().user,
        codigoSala: this.getCanal()
      }
      this.socket.emit('mostrarActividad', datos);

    }
  }

  obtenerRanking() {
    if (this.logService.estaLogeado()) {
      let datos = {
        adminID: this.logService.getUserData().user,
        codigoSala: this.getCanal()
      }
      this.socket.emit('obtenerRanking', datos);
    }
  }

  terminarJuego() {
    if (this.logService.estaLogeado()) {
      let datos = {
        adminID: this.logService.getUserData().user,
        codigoSala: this.getCanal()
      }
      this.socket.emit('terminarJuego', datos);
    }
  }

  setCanal(nombreCanal: string) {
    this.cookies.set("nombreCanal", nombreCanal);
  }

  getCanal() {
    return this.cookies.get("nombreCanal");

  }

  destruirCanal() {
    this.cookies.delete('nombreCanal');
  }
}