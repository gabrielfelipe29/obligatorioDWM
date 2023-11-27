import { Component } from '@angular/core';
import { PropuestasService } from '../services/propuestas.service';
import { Propuesta } from '../interfaces/propuesta';
import { Router } from '@angular/router';
import { JuegoService } from '../services/juego.service';

@Component({
  selector: 'app-espera-admin',
  templateUrl: './espera-admin.component.html',
  styleUrls: ['./espera-admin.component.css']
})

export class EsperaAdminComponent {

  propuestaActual: Propuesta

  constructor(private servicioPropuestas: PropuestasService, private router: Router, private servicioJuego: JuegoService ) {
    const resultado = this.servicioPropuestas.obtenerPropuestaActual();
    if (resultado !== undefined) {
      this.propuestaActual = resultado;
    } else {
      this.propuestaActual = { id: 0, titulo: 'Tarjeta 0', descripcion: 'Descripcion de la tarjeta 0', actividades: [], imagen: "#" }; 
    }
  }

  terminarJuego(){

    
  }

}