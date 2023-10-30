import { Component, OnInit } from '@angular/core';
import { PropuestasService } from '../propuestas.service';
import { Propuesta } from '../propuesta';

@Component({
  selector: 'app-propuestas',
  templateUrl: './propuestas.component.html',
  styleUrls: ['./propuestas.component.css']
})
export class PropuestasComponent implements OnInit {
  propuestas: Propuesta[] = [];

  constructor(private servicio: PropuestasService) {
    // Inyección de dependencias del servicio en el constructor
  }

  ngOnInit(): void {
    this.servicio.obtenerPropuestas().subscribe(propuestas => {
      this.propuestas = propuestas;
    });
  }
}
/*
Tiene q haber un aviso a los demás para que así{



  el middlewhere es una funcion de validacion de token 
} 
*/


