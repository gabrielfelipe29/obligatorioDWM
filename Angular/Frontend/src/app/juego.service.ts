import { Injectable } from '@angular/core';
import { Jugador } from './para-pruebas/jugador';
import { Observable, of } from 'rxjs';
import { SocketService } from './socket.service';


@Injectable({
  providedIn: 'root'
})
export class JuegoService {

  constructor(private socketService: SocketService) { }

  jugadores: Jugador[] = []; 

  yaEstaEnSala = false

  getJugadores(): Observable<Jugador[]> {
    const juadoresConst = of(this.jugadores);
    return juadoresConst;
  }

  agregarJugador(alias: string){
    this.jugadores.push(new Jugador(alias))
  }

  quitarJugador(alias: string){
    this.jugadores = this.jugadores.filter(elemento => elemento.psudonimo == alias);
  }

  entrarASalaEspera(){
    this.yaEstaEnSala = true
  }

  iniciarJuego(){
    this.socketService.iniciarJuego()
  }

}
