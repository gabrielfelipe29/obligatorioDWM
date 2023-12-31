import { Component, EventEmitter, Output } from '@angular/core';
import { JuegoService } from '../services/juego.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-votos-juego',
  templateUrl: './votos.component.html',
  styleUrls: ['./votos.component.css']
})
export class VotosComponent {

  constructor(private juegoService: JuegoService, private router: Router) { }

  votar(option: number) {

    let ranking = [0, 0, 0]
    let voto = false

    switch (option) {
      case 1:
        // ME gusta
        ranking[0] = 1
        voto = true
        break
      case 2:
        // No me gusta
        ranking[1] = 1
        voto = true
        break
      case 3:
        // Me da igual
        ranking[2] = 1
        voto = true
        break
      default:
        alert("Hubo un inconveniente a la hora de votar la actividad")
        break
    }
    if (voto) {
      this.juegoService.votarActividad(ranking).subscribe(
        data => {
          this.router.navigate(["/esperaJugador"])
        },
        error => {
          console.log("Ocurrio un error: ") 
          console.log(error)
        }
      )
    }

  }
}
