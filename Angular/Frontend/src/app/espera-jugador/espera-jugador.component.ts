import { Component, OnInit } from '@angular/core';
import { JuegoService } from '../services/juego.service';
import { Actividad } from '../interfaces/actividad';

@Component({
  selector: 'app-espera-jugador',
  templateUrl: './espera-jugador.component.html',
  styleUrls: ['./espera-jugador.component.css']
})
export class EsperaJugadorComponent implements OnInit {

  contador: number
  
  actividadActual: Actividad = new Actividad(0, "", "", "")

  constructor(private juegoService: JuegoService){
    this.contador = juegoService.contador
  }

  ngOnInit(): void {
    this.juegoService.getActividadActual().subscribe(actividadRecibida => this.actividadActual = actividadRecibida);

    // Aca tiene que estar el socket esperando por resultados de actividad
    
  }

  
}
