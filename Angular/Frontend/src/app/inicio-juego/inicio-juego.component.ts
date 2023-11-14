import { Component, OnInit } from '@angular/core';
import { PropuestasService } from '../propuestas.service';
import { Propuesta } from '../propuesta';
import { Router } from '@angular/router';
import { JuegoService } from '../juego.service';
import { CookieService } from 'ngx-cookie-service';
import { Jugador } from '../jugador';

@Component({
  selector: 'app-inicio-juego',
  templateUrl: './inicio-juego.component.html',
  styleUrls: ['./inicio-juego.component.css']
})
export class InicioJuegoComponent implements OnInit {
  

  constructor(private servicioPropuestas: PropuestasService, private router: Router, private servicioJuego: JuegoService, private cookies: CookieService) {
  
  }

  jugadores: Jugador[] = []
  codigoSala: string = ""
  qrCodeUrl: string = ""

  ngOnInit(){
    this.servicioJuego.entrarASalaEspera()
    this.codigoSala = this.cookies.get("codigoSala")
    this.qrCodeUrl = this.cookies.get("qrCode")
    this.servicioJuego.getJugadores().subscribe(jugadores => this.jugadores = jugadores);
  }

  public comprobarEsAdmin(){
    return this.cookies.check("token")
  }

  public iniciarJuego(){
    this.servicioJuego.iniciarJuego()
  }

}
