import { AfterViewInit, Component, OnInit } from '@angular/core';
import { PropuestasService } from '../services/propuestas.service';
import { Router } from '@angular/router';
import { JuegoService } from '../services/juego.service';
import { CookieService } from 'ngx-cookie-service';
import { Jugador } from '../interfaces/jugador';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-inicio-juego',
  templateUrl: './inicio-juego.component.html',
  styleUrls: ['./inicio-juego.component.css']
})
export class InicioJuegoComponent implements OnInit {

  private socket: any;

  jugadores: Jugador[] = []
  codigoSala: string = ""
  qrCodeUrl: string = ""
  esAdmin: boolean = false

  constructor(private servicioPropuestas: PropuestasService, private router: Router, private juegoService: JuegoService, private cookies: CookieService, private socketService: SocketService) {
    this.socket = socketService.getSocket();

    // Recuperamos los jugadores que se habían unido además del actual
    this.juegoService.getJugadores().subscribe(jugadores => this.jugadores = jugadores);
    this.juegoService.entrarASalaEspera()
    this.codigoSala = this.cookies.get("codigoSala")
    this.qrCodeUrl = this.cookies.get("qrCode")
    this.esAdmin = this.cookies.check("token") && this.cookies.check("userID")


  }





  ngOnInit() {
    // El socket  recibe a los jugadores y al admin, pero solo carga el alias de los juegadores
    this.socket.on("esperaJuego", (mensaje: any) => {
      if (mensaje.listaJugadores != undefined) {
        this.juegoService.establecerJugadores(mensaje.listaJugadores)
        this.juegoService.getJugadores().subscribe(jugadores => this.jugadores = jugadores);
      }
    });

    this.socket.on("actividad", (mensaje: any) => {
      console.log("Llego a donde tenía que llegar", mensaje)
      console.log("Resultado: " + (mensaje.actividad !== undefined && mensaje.actividad.idActividad != undefined && mensaje.actividad.titulo != undefined &&
        mensaje.actividad.descripcion != undefined && mensaje.actividad.imagen != undefined))
      if (mensaje.actividad !== undefined && mensaje.actividad.idActividad != undefined && mensaje.actividad.titulo != undefined &&
        mensaje.actividad.descripcion != undefined && mensaje.actividad.imagen != undefined) {

        // Revisa si es la última actividad y pasa el parametro al servicio
        this.router.navigateByUrl('/actividad');
        this.juegoService.setActividad(mensaje.actividad.idActividad, mensaje.actividad.titulo, mensaje.actividad.descripcion, mensaje.actividad.imagen)
      }

    })


    this.socket.on("jugadorAbandonoSalaEsperaJuego", (mensaje: any) => {
      if (mensaje.aliasJugador != undefined)
        this.juegoService.quitarJugador(mensaje.aliasJugador)
    })


    this.socket.on("errores", (mensaje: any) => {
      alert(mensaje)
    });

  }


  public iniciarJuego() {
    this.servicioPropuestas.iniciarJuego()
  }

}