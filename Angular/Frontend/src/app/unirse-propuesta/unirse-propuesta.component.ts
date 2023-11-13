import { Component } from '@angular/core';
<<<<<<< HEAD
import { SocketService } from '../socket.service';
import { Router } from '@angular/router';
=======
>>>>>>> 1bed35b1b0403f90514b5b9fb6767e56a832d287

@Component({
  selector: 'app-unirse-propuesta',
  templateUrl: './unirse-propuesta.component.html',
  styleUrls: ['./unirse-propuesta.component.css']
})
<<<<<<< HEAD

export class UnirsePropuestaComponent {

  codigo: string = "";


  constructor( private router: Router){}

  guardarCodigo(){
    this.router.navigate(["/unirsePropuesta/" + this.codigo])
  }

}

=======
export class UnirsePropuestaComponent {

}
>>>>>>> 1bed35b1b0403f90514b5b9fb6767e56a832d287
