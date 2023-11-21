import { Component } from '@angular/core';
import { JuegoService } from '../services/juego.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent {

  hayPrimerPuesto = false
  haySegundoPuesto = false
  hayTercerPuesto = false

  constructor(private juegoService: JuegoService){
    let resultados = this.juegoService.obtenerRanking()
  }

}
