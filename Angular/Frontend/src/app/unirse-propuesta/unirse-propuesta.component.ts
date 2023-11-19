import { Component } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unirse-propuesta',
  templateUrl: './unirse-propuesta.component.html',
  styleUrls: ['./unirse-propuesta.component.css']
})

export class UnirsePropuestaComponent {

  codigo: string = "";


  constructor( private router: Router){}

  guardarCodigo(){
    this.router.navigate(["/unirsePropuesta/" + this.codigo])
  }

}

