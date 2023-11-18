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
  usuario = ""
  constructor(private servicio: PropuestasService, private router: Router) {
    // Inyección de dependencias del servicio en el constructor
    const storedData = localStorage.getItem("usuario");
    if (storedData) {
      const info = JSON.parse(storedData);
      console
      this.usuario = info.name;
    } else {
      console.log('No se encontraron datos en el Local Storage.');
    }

  }

  ngOnInit(): void {
    /*
    const storedData = localStorage.getItem("usuario");
    if (storedData) {
      const info = JSON.parse(storedData);
      console
      this.nombre = info.name;
    } else {
      console.log('No se encontraron datos en el Local Storage.');
    }
    */
    this.servicio.obtenerPropuestas().subscribe(propuesta => {
      this.propuestas = propuesta;
    });
    console.log(this.propuestas)
  }

  verDetalles(id: number) {
    console.log(id)
    this.servicio.verDetalles(id);
    this.router.navigate(['/detalles', id]);
  }
  
}

/*
Tiene q haber un aviso a los demás para que así{



  el middlewhere es una funcion de validacion de token 
} 
*/


