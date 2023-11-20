import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-barra-de-navegacion',
  templateUrl: './barra-de-navegacion.component.html',
  styleUrls: ['./barra-de-navegacion.component.css']
})
export class BarraDeNavegacionComponent {

  constructor( private cookies: CookieService){}

  nombre: string =this.cookies.get("userID");

  cerrarSesion(){
    this.cookies.delete("userID");
  }
}