import { AfterViewInit, Component, Input } from '@angular/core';

@Component({
  selector: 'app-temporizador',
  templateUrl: './temporizador.component.html',
  styleUrls: ['./temporizador.component.css']
})
export class TemporizadorComponent implements AfterViewInit {

  @Input() contadorActual: number = 30

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.ejecutarTimer();
    });
  }


  ejecutarTimer() {
     // Utilizar setInterval para ejecutar la operación cada 1000 milisegundos (1 segundo)
     const intervalo = setInterval(() => {
      this.contadorActual--;
      console.log()

      // Detener el intervalo después de ejecutar la operación 5 veces
      if (this.contadorActual === 0) {
        clearInterval(intervalo);
      }
    }, 1000);
    }
  
}
