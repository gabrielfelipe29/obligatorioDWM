import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InterceptorInterceptor } from './interceptor.interceptor';

@Injectable({
  providedIn: 'root'
})
export class LogInService {

  constructor(private client: HttpClient) { }

  /*
    Metodo encargado de realizar el log in, 
  */

  login(usurio: string, contraseña: string): Boolean[] {
    let url = "https://mis-clientes-bb0c8-default-rtdb.firebaseio.com/login";
    let datos = {
      "user": usurio,
      "password": contraseña
    }

    let userValid = false
    let passValid = false

    let paraDevolver: Boolean[] = []
    this.client.post(url, datos, { observe: 'response' }).subscribe(
      (response: HttpResponse<any>) => {
        // Si se da un error lo contenemos 
        if (response.status == 401) {
          let responseBody = response.body
          if (responseBody.hasOwnProperty('user')) {
            userValid = responseBody['user'] == "valid";
          }
          if (responseBody.hasOwnProperty('pass')) {
            passValid = responseBody['pass'] == "valid";
          }
          paraDevolver.push(userValid)
          paraDevolver.push(passValid)
          // Ahora trabajamos con el body
        } else {
          /* Lógica para pasar a la pantalla de administrador */

        }
      },
      (error: HttpResponse<any>) => {
        console.log("Hubo un error en el camino " + error)
        paraDevolver.push(false)
      }
    );

    return paraDevolver
  }

  singUp(usuario: string, pass: string) {

  }
}
