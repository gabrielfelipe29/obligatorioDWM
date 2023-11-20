import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Jugador } from './jugador';
import { Actividad } from './actividad';

@Injectable({
  providedIn: 'root'
})
export class JuegoService {

  constructor() { }

  privateRanking: Actividad[] = []
  ranking: Observable<Actividad[]> = of(this.privateRanking)

  privateVotante: number = 0
  votantes: Observable<number> = of(this.privateVotante)

  iniciarJuego(idPropuesta: any){ 
  }

  obtenerCodigoPropuesta(){
    return 1
  }

  jugadores: Jugador[] = []; 

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
}

