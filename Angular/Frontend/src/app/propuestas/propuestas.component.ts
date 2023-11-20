import { Component, OnInit } from '@angular/core';
import { PropuestasService } from '../propuestas.service';
import { Propuesta } from '../propuesta';
import { Router } from '@angular/router';

@Component({
  selector: 'app-propuestas',
  templateUrl: './propuestas.component.html',
  styleUrls: ['./propuestas.component.css']
})
export class PropuestasComponent implements OnInit {
  propuestas: Propuesta[] = [];



  constructor(private servicio: PropuestasService, private router: Router) {
    // Inyección de dependencias del servicio en el constructor
  }

  ngOnInit(): void {
    this.servicio.obtenerPropuestas().subscribe(propuestas => {
      this.propuestas = propuestas;
    });
  }

  verDetalles(id: number) {
    this.servicio.verDetalles(id);
    this.router.navigate(['/detalles', id]);
  }
  
}
/*
Tiene q haber un aviso a los demás para que así{



  el middlewhere es una funcion de validacion de token 
} 
*/


