import { Injectable, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";
import { LogInService } from './services/log-in.service';
import { Router } from "@angular/router";
import { JuegoService } from './services/juego.service';

@Injectable({
  providedIn: 'root',
})
export class SocketServiceViejo  implements OnInit{

  private socket: any;

  constructor(private cookies: CookieService, private logService: LogInService, private router: Router, private juegoService: JuegoService) {
    this.socket = io('http://localhost:3000'); // Reemplaza con la URL de tu servidor Node.js
  }


  ngOnInit() {


    /* Puedo usar varios canales a la vez, usando nombreCanal_algoMás, de esta forma, serán canales dinamicos, 
    lo cual hace más eficiente el socket */
    // Escuchar mensajes en un canal específico
    this.socket.on("1", (mensaje: any) => {


      if (mensaje.asunto !== undefined && mensaje.asunto == "ranking") {
        // Aca llegan los resultados de la propuesta como ta, el ranking de actividades
        // this.juegoService.setRanking()
        //this.router.navigateByUrl('/ranking');
      }

      // Por si se desconecta un usuario mientras están todos en la sala de espera
      if (mensaje.asunto !== undefined && mensaje.asunto == "jugadorAbandonoSalaEsperaJuego") {
        this.juegoService.quitarJugador(mensaje.alias)
      }

     

      console.log('Mensaje recibido:', mensaje);
    });

    this.socket.on("errores", (mensaje: any) => {
      alert(mensaje)
    });
  }

}