import {Component, OnInit } from '@angular/core';
import { JuegoService } from '../services/juego.service';
import { Actividad } from '../interfaces/actividad';
import { AppModule } from '../app.module';
import { SocketService } from '../services/socket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})

export class JuegoComponent implements OnInit   {

  socket: any = null

  constructor(private juegoService: JuegoService, private socketService: SocketService, private router: Router) {
    this.socket = socketService.getSocket();

  }

  actividadActual: Actividad = new Actividad(0, "", "", "")

  contador: number = 30

  ngOnInit(): void {
    this.juegoService.getActividadActual().subscribe(actividadRecibida => this.actividadActual = actividadRecibida);

    this.socket.on("restultadoActividad", (mensaje: any) => {
      if (mensaje.resultado !== undefined && mensaje.resultado.meGusta !== undefined && mensaje.resultado.noMeGusta !== undefined
        && mensaje.resultado.meDaIgual !== undefined) {
        this.juegoService.setResultadosActividad(mensaje.resultado.meGusta, mensaje.resultado.noMeGusta, mensaje.resultado.meDaIgual)
        this.router.navigateByUrl('/restultadoActividad');
      }

    })

    // Aca tiene que estar el socket esperando por resultados de actividad


  }
  
}