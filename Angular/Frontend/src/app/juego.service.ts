import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JuegoService {

  constructor() { }

  privateVotante: number = 0
  votantes: Observable<number> = of(this.privateVotante)

  iniciarJuego(idPropuesta: any){ 
  }

  obtenerCodigoPropuesta(){
    return 1

  }


}
