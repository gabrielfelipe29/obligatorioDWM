import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ingresar-pseudonimo',
  templateUrl: './ingresar-pseudonimo.component.html',
  styleUrls: ['./ingresar-pseudonimo.component.css']
})
export class IngresarPseudonimoComponent implements OnInit {

  constructor(private socketService: SocketService, private router: Router) { }

  codigo: string = ""
  pseudonimo: string = ""

  ngOnInit() {
    let urlPagina = this.router.url;
    let datos = urlPagina.split("/")
    this.codigo = datos[datos.length -1]
    console.log('Codigo actual:', this.codigo);
    this.socketService.setCanal(this.codigo);

  }

  unirseJuego() {
    this.socketService.unirseJuego(this.codigo, this.pseudonimo);
  }
}
