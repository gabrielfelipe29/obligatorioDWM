import { AfterViewInit, Component, OnInit } from '@angular/core';
import { JuegoService } from '../services/juego.service';
import { Actividad } from '../interfaces/actividad';
import { AppModule } from '../app.module';
import { SocketService } from '../services/socket.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})

export class JuegoComponent implements OnInit, AfterViewInit {

  socket: any = null

  esAdmin: boolean = false

  constructor(private juegoService: JuegoService, private socketService: SocketService, private router: Router, private cookies: CookieService) {
    this.socket = socketService.getSocket();

  }

  actividadActual: Actividad = new Actividad(0, "", "", "")

  contador: number = 30



  ngOnInit(): void {
    this.juegoService.getActividadActual().subscribe(actividadRecibida => this.actividadActual = actividadRecibida);

    this.socket.on("restultadoActividad", (mensaje: any) => {
      this.contador = 0
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




  ngAfterViewInit(): void {
    this.esAdmin = this.cookies.check("token") && this.cookies.check("userID")

    this.ejecutarTimer();
  }


  ejecutarTimer() {
    // Utilizar setInterval para ejecutar la operación cada 1000 milisegundos (1 segundo)
    const intervalo = setInterval(() => {
      this.contador--
      // Detener el intervalo después de ejecutar la operación 5 veces
      if (this.contador === 0) {
        clearInterval(intervalo);
      }
    }, 1000);
  }

}


