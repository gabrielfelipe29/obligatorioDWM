// socket.service.ts
import { Injectable } from '@angular/core';
import { io } from "socket.io-client";
import { LogInService } from './log-in.service';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: any;

  constructor(private logService: LogInService, private cookies: CookieService) {
    // Establecer la conexión con el servidor Socket.IO al crear el servicio
    this.socket = io('http://localhost:3000'); // Reemplaza con la URL de tu servidor
  }

  getSocket() {
    // Devolver el objeto de socket para que pueda ser utilizado en otros componentes
    return this.socket;
  }

  // Vamos a usar las funciones para manejar mejor las cosas
  /* Solo para los jugadores */

  unirseJuego(cod: string, pseu: string) {

    // Enviar un mensaje al servidor en un canal específico
    let datos = {
      rol: "player",
      codigo: cod,
      pseudonimo: pseu
    }
    this.setCanal(cod)
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
        rol: "admin",
        codigo: cod,
        token: this.logService.getToken(),
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
      console.log("obtener RAnking")
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
