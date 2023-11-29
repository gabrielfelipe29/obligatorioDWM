import { Component } from '@angular/core';
import { JuegoService } from '../services/juego.service';
import { ResultadoPropuesta } from '../interfaces/resultadoPropuesta';
import { Router } from '@angular/router';
import { LogInService } from '../services/log-in.service';
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

  constructor(private juegoService: JuegoService, private router: Router, private loginService: LogInService) {
    this.resultados = this.juegoService.obtenerRanking()
    this.hayPrimerPuesto = this.resultados.primerLugar != undefined
    this.haySegundoPuesto = this.resultados.segundoLugar != undefined
    this.hayTercerPuesto = this.resultados.tercerLugar != undefined

  }

  volver() {

    if (this.loginService.estaLogeado()) {
      this.router.navigateByUrl('/inicio');
    } else {
      this.router.navigateByUrl('/');
    }
  }

}
