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
  nombre: string ="";
  constructor(private servicio: PropuestasService, private router: Router) {
    // Inyección de dependencias del servicio en el constructor
  }

  ngOnInit(): void {
    const storedData = localStorage.getItem("usuario");
    if (storedData) {
      const info = JSON.parse(storedData);
      console
      this.nombre = info.name;
    } else {
      console.log('No se encontraron datos en el Local Storage.');
    }
    this.servicio.obtenerPropuestas(this.nombre).subscribe(propuestas => {
      this.propuestas = propuestas;
    });
  }

  verDetalles(id: number) {
    this.servicio.propuestaActual= id;
    console.log("el coso es :"+this.servicio.propuestaActual)
    this.router.navigate(['/detalles', id]);
  }
}
/*
Tiene q haber un aviso a los demás para que así{



  el middlewhere es una funcion de validacion de token 
} 
*/


