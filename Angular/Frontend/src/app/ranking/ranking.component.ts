import { Component } from '@angular/core';
import { JuegoService } from '../services/juego.service';
import { ResultadoPropuesta } from '../interfaces/resultadoPropuesta';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent {

  hayPrimerPuesto = false
  haySegundoPuesto = false
  hayTercerPuesto = false

  resultados: ResultadoPropuesta = new ResultadoPropuesta(undefined, undefined, undefined)

  constructor(private juegoService: JuegoService){
    this.resultados = this.juegoService.obtenerRanking()

    this.hayPrimerPuesto = this.resultados.primerLugar != undefined
    this.haySegundoPuesto = this.resultados.segundoLugar != undefined
    this.hayTercerPuesto = this.resultados.tercerLugar != undefined

  }

}