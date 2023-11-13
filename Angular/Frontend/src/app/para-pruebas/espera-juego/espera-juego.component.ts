import { Component, OnInit } from '@angular/core';
import { Jugador } from '../jugador';
import { CookieService } from 'ngx-cookie-service';
import { JuegoService } from 'src/app/juego.service';

@Component({
  selector: 'app-espera-juego',
  templateUrl: './espera-juego.component.html',
  styleUrls: ['./espera-juego.component.css']
})
export class EsperaJuegoComponent  implements OnInit{

  constructor(private cookies: CookieService, private juegoService: JuegoService){}

  jugadores: Jugador[] = [];
  codigoSala: string = ""
  qrCodeUrl: string = ""




  ngOnInit(){
    this.juegoService.entrarASalaEspera()
    this.codigoSala = this.cookies.get("nombreSala")
    this.qrCodeUrl = this.cookies.get("qrCode")
    this.juegoService.getJugadores().subscribe(jugadores => this.jugadores = jugadores);
  }

  public comprobarEsAdmin(){
    return this.cookies.check("token")
  }

  public iniciarJuego(){
    this.juegoService.iniciarJuego()
  }


}
