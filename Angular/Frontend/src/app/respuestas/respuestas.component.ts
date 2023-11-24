import { AfterViewInit, Component, OnInit } from '@angular/core';
import { JuegoService } from '../services/juego.service';
import { Actividad } from '../interfaces/actividad';
import { SocketService } from '../services/socket.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-respuestas',
  templateUrl: './respuestas.component.html',
  styleUrls: ['./respuestas.component.css']
})
export class RespuestasComponent implements OnInit{

  tituloActividad: string = ""
  cantidadMeGusta: number = 0
  cantidadMeDaIgual: number = 0
  cantidadNoMeGusta: number = 0
  eraLaUltima: boolean = false

  esAdmin: boolean = false

  socket: any

  constructor(private juegoService: JuegoService, private socketService: SocketService, private router: Router, private cookies: CookieService) {
    this.esAdmin = this.cookies.check("token") && this.cookies.check("userID")

  }


  ngOnInit(): void {
    var ranking: any
    this.socket = this.socketService.getSocket()
    this.juegoService.getActividadActual().subscribe((actividadRecibida) => {
      ranking = actividadRecibida.obtenerResultados()
      this.tituloActividad = actividadRecibida.titulo
      
    });

    this.juegoService.getEsUltima().subscribe(esUltimaService => {
      console.log("Ahora cargamos si es ultima" + esUltimaService)
      this.eraLaUltima = esUltimaService
    } )

    this.cantidadMeGusta = ranking.meGusta
    this.cantidadMeDaIgual = ranking.meDaIgual
    this.cantidadNoMeGusta = ranking.noMeGusta


    this.socket.on("actividad", (mensaje: any) => {
      if (mensaje.actividad !== undefined && mensaje.actividad.idActividad != undefined && mensaje.actividad.titulo != undefined &&
        mensaje.actividad.descripcion != undefined && mensaje.actividad.imagen != undefined) {
        this.router.navigateByUrl('/actividad');
        this.juegoService.setActividad(mensaje.actividad.idActividad, mensaje.actividad.titulo, mensaje.actividad.descripcion, mensaje.actividad.imagen)
      }

    })

    this.socket.on("ranking", (mensaje: any) => {
      if(mensaje.resultados != undefined) {
        this.juegoService.setRanking(mensaje.resultados.primero, mensaje.resultados.segundo, mensaje.resultados.tercero) 
        this.router.navigateByUrl('/ranking');
      } else {
        alert("Ocurró un error a la hora de obtener el ranking")
      }
          
  })

}
  siguienteActividad() {
    this.socketService.mostrarSiguienteActividad()
  }

  mostrarRanking(){
    this.socketService.obtenerRanking()
  }

 


}
