import { Component, OnInit } from '@angular/core';
import { JuegoService } from '../juego.service';
import { Actividad } from '../actividad';
import { AppModule } from '../app.module';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})

export class JuegoComponent implements OnInit {

  constructor(private servicioJuego: JuegoService) { }

  actividadActual: Actividad = new Actividad(0, "", "", "")

  contador: number = 30

  ngOnInit(): void {
    this.servicioJuego.getActividadActual().subscribe(actividadRecibida => this.actividadActual = actividadRecibida);

    for (this.contador = 30; this.contador > 0; this.contador--) {
      setTimeout(() => {
        this.contador--
      },
        1000)
    }
  }
}