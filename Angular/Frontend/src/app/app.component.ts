import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Juego';

  constructor(private cookieService: CookieService){}
  ngOnInit(): void {


    // Definimos el nombre de las cookies que se usan
    let cookiesUsadas: string[] = ["qrCode","aliasPlayer","codigoSala","token","userID","userPassword","nombreCanal"]

    // Borramos las cookies que hayan quedado de instancias anteriores del programa
    for (let cookieName of cookiesUsadas){
      if(this.cookieService.check(cookieName)){
        this.cookieService.delete(cookieName)
      }
    }
  }
}
