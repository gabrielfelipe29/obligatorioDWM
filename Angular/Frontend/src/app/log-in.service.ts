import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InterceptorInterceptor } from './interceptor.interceptor';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogInService {

  constructor(private client: HttpClient) { }

  /*
    Metodo encargado de realizar el log in, 
  */

  async login(usuario: string, contraseña: string): Promise<Boolean[]> {
    let url = "localhost:3000/login";
    let datos = {
      "administrador": {
        "id": usuario,
        "contraseña": contraseña
      }
    }

    console.log(datos);

    let paraDevolver: Boolean[] = [];

    try {
      const response: HttpResponse<any> | undefined = await this.client.post(url, datos, { observe: 'response' }).toPromise();

      if (!response) {
        // Handle the case where response is undefined
        console.log("No se recibió respuesta de la solicitud.");
        paraDevolver.push(false);
      } else {
        if (response.status == 401) {
          // Realizar acciones para un error 401, si es necesario
        }

        if (response.status == 400) {
          // Error en el formato del JSON
          console.log("Error en el formato del JSON");
          paraDevolver.push(false);
        }

        if (response.status == 200) {
          localStorage.setItem("tokenApp", response.body.token);
          localStorage.setItem("userLogeado", "true");
          // Lógica para pasar a la pantalla de administrador
          paraDevolver.push(true);
        }
      }
    } catch (error) {
      console.log("Hubo un error en el camino " + error);
      paraDevolver.push(false);
    }

    return paraDevolver;
  }



  singUp(usuario: string, pass: string) {

  }

   hacerSolicitudPOST() {

/*     let url = "localhost:3000/login"; */

    let body = {
      "administrador": {
        "id": "admin",
        "contraseña": "admin"
      }
    }
    let bodyNuevo = JSON.stringify(body)



/*     let headers = {
      'Content-Type': 'application/json',
    } */

    const url = 'http://localhost:3000/login';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //'Access-Control-Allow-Origin': 'http://localhost:4200' // La URL de origen del cliente Angular
    });

    this.client.post(url, bodyNuevo, { headers }).subscribe(response => {
      // Manejar la respuesta
    });

    return this.client.post(url, bodyNuevo,{headers}
    ).pipe(tap(
      (res: any) => {
        if (res) {
          console.log("Respuesta ", res)
        }
      })
    );

  /*   this.client.post(url, body, { headers })
      .subscribe(
        (data) => {
          console.log('Respuesta exitosa:', data);
        },
        (error) => {
          console.error('Error en la solicitud:', error);
        }
      ); */
  }
}
