import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { JuegoService } from '../services/juego.service';


@Component({
  selector: 'app-ingresar-pseudonimo',
  templateUrl: './ingresar-pseudonimo.component.html',
  styleUrls: ['./ingresar-pseudonimo.component.css']
})
export class IngresarPseudonimoComponent implements OnInit {


  codigo: string = ""
  pseudonimo: string = ""

  private socket: any;

  constructor(private socketService: SocketService, private router: Router, private cookies: CookieService, private juegoService: JuegoService) {
    this.socket = socketService.getSocket();
  }

  ngOnInit() {
    let urlPagina = this.router.url;
    let datos = urlPagina.split("/")
    this.codigo = datos[datos.length - 1]
    console.log('Codigo actual: +' + this.codigo + "+");
    this.socketService.setCanal(this.codigo);

    // Ahora escuchamos los mensajes que nos importan por el canal
    this.socket.on("esperaJuego", (mensaje: any) => {
      this.cookies.set("qrCode", mensaje.qrCodeSala)

      // Cuando se crea la sala también se une el admin, por lo cual alias va a estar "", en ese caso no se agrega jugador
      if (mensaje.listaJugadores != undefined) {
        this.juegoService.establecerJugadores(mensaje.listaJugadores)
      }

      if (!this.juegoService.yaEstaEnSala) {
        this.router.navigate(['/inicioJuego']);
      }
    });


    this.socket.on("errores", (mensaje: any) => {
      alert(mensaje)
    });

  }

  unirseJuego() {
    this.socketService.unirseJuego(this.codigo, this.pseudonimo);
    this.cookies.set("aliasPlayer",  this.pseudonimo)

  }
}
