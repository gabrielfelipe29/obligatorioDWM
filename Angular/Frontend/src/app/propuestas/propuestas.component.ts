import { Component, OnInit } from '@angular/core';
import { PropuestasService } from '../services/propuestas.service';
import { Propuesta } from '../interfaces/propuesta';
import { Router } from '@angular/router';
import { JuegoService } from '../services/juego.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-propuestas',
  templateUrl: './propuestas.component.html',
  styleUrls: ['./propuestas.component.css']
})
export class PropuestasComponent implements OnInit {
  propuestas: Propuesta[] = [];
  usuario: string ="";


  constructor(private servicio: PropuestasService, private router: Router, private juegoService: JuegoService, private cookies: CookieService) {
    // Inyección de dependencias del servicio en el constructor
  }

  ngOnInit(): void {
    this.servicio.obtenerPropuestas().subscribe(propuesta => {
    });
    
  }

  verDetalles(id: string) {
    this.servicio.verDetalles(id);
    this.router.navigate(['/detalles', id]);
  }

  crearSala(propuesta: Propuesta) {
    /*   this.juegoService.crearSala(propuesta) */
    let datos = {
      "propuesta": propuesta,
    }


    this.juegoService.crearSala(datos).subscribe(
      data => {
        if (data && data.salaId && data.codigoQR) {
          console.log(data)
          // { salaId: result.insertedId.toString(), codigoQR: url 
          this.cookies.set("codigoSala", data.salaId)
          this.cookies.set("qrCode", data.codigoQR)
          this.servicio.unirseSala(data.salaId)
          this.router.navigate(['inicioJuego'])
        }

      },
      error => {
        console.log(error);
      });

  }

}
