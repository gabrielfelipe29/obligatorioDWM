import { Component } from '@angular/core';

@Component({
  selector: 'app-barra-de-navegacion',
  templateUrl: './barra-de-navegacion.component.html',
  styleUrls: ['./barra-de-navegacion.component.css']
})
export class BarraDeNavegacionComponent {
  nombre: string ="";
  ngOnInit() {
    const storedData = localStorage.getItem("usuario");
    if (storedData) {
      const info = JSON.parse(storedData);
      console
      this.nombre = info.name;
    } else {
      console.log('No se encontraron datos en el Local Storage.');
    }
  }

  cerrarSesion(){
    localStorage.removeItem("usuario");
  }
}
