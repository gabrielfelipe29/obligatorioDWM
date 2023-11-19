import { Component } from '@angular/core';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-unirse-juego',
  templateUrl: './unirse-juego.component.html',
  styleUrls: ['./unirse-juego.component.css']
})
export class UnirseJuegoComponent {

  /* codigo: string = "";
  pseudonimo: string = "";

  ingresoCodigo: boolean = false;

  constructor( private socketService: SocketService){}

  guardarCodigo(){
    this.socketService.setCanal(this.codigo);
    this.ingresoCodigo = true;
  }
  unirseJuego(){
    this.socketService.unirseJuego(this.codigo, this.pseudonimo);
  } */
}
