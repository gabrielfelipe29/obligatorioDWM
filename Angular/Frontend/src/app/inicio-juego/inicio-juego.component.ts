import { Component, OnInit } from '@angular/core';
import { PropuestasService } from '../propuestas.service';
import { Propuesta } from '../propuesta';
import { Router } from '@angular/router';
import { JuegoService } from '../juego.service';

@Component({
  selector: 'app-inicio-juego',
  templateUrl: './inicio-juego.component.html',
  styleUrls: ['./inicio-juego.component.css']
})
export class InicioJuegoComponent implements OnInit {
  
  // Propuesta la cual se esta jugando 
  propuestaActual: Propuesta

  // Código de la propuesta
  codigo: number

  // Cantidad de jugadores total
  votantes: number


  constructor(private servicioPropuestas: PropuestasService, private router: Router, private servicioJuego: JuegoService ) {
    const resultado = this.servicioPropuestas.obtenerPropuestaActual();
    if (resultado !== undefined) {
      this.propuestaActual = resultado;
      this.codigo = this.servicioJuego.obtenerCodigoPropuesta()
    } else {
      this.propuestaActual = { id: 0, titulo: 'Tarjeta 0', descripcion: 'Descripcion de la tarjeta 0', actividades: [], creatorId: "usuario_1", imagen: "#" };
      this.codigo = 0
    }
    this.votantes = 0
  }

  ngOnInit(): void {
    this.servicioJuego.votantes.subscribe((votantes) => {
      this.votantes = votantes;
      console.log("aaaaaaaaa");
    });
  }
  iniciarJuego(){
    this.servicioJuego.iniciarJuego(this.propuestaActual.id)
  }

}
