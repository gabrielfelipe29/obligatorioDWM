import { Component, OnInit } from '@angular/core';
import { JuegoService } from '../services/juego.service';
import { Actividad } from '../interfaces/actividad';
import { SocketService } from '../services/socket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-espera-jugador',
  templateUrl: './espera-jugador.component.html',
  styleUrls: ['./espera-jugador.component.css']
})
export class EsperaJugadorComponent implements OnInit {

  socket: any = null
  actividadActual: Actividad = new Actividad("0", "", "", "")

  constructor(private juegoService: JuegoService, private socketService: SocketService, private router: Router) {
    this.socket = socketService.getSocket();
  }

  ngOnInit(): void {
    this.juegoService.getActividadActual().subscribe(actividadRecibida => this.actividadActual = actividadRecibida);

    this.socket.on("restultadoActividad", (mensaje: any) => {
      if (mensaje.resultado !== undefined && mensaje.resultado.meGusta !== undefined && mensaje.resultado.noMeGusta !== undefined
        && mensaje.resultado.meDaIgual !== undefined) {
        this.juegoService.setResultadosActividad(mensaje.resultado.meGusta, mensaje.resultado.noMeGusta, mensaje.resultado.meDaIgual)

        if(mensaje.ultimaActividad !== undefined && mensaje.ultimaActividad == true){
          this.juegoService.esUltima = true
        }
        this.router.navigateByUrl('/restultadoActividad');
      }
    })

  }


}
