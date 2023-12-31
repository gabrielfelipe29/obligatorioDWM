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
      this.propuestas = propuesta
    });
    
  }

  eliminar(id:string){
    const tarjetaIndex = this.propuestas.findIndex(tarjeta => tarjeta._id === id);

  if (tarjetaIndex !== -1) {
    this.servicio.eliminarPropuesta(id);
    this.propuestas.splice(tarjetaIndex, 1);
  }

  }


  verDetalles(id: string) {
    this.servicio.verDetalles(id);
    this.router.navigate(['/detalles', id]);
  }

  crearSala(propuesta: Propuesta) {
    let datos = {
      "propuesta": propuesta,
    }


    this.servicio.crearSala(datos).subscribe(
      data => {
        if (data && data.salaId && data.codigoQR) {
          console.log("Vamos a crear la sala")
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
