import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { QRCodeModule } from 'angularx-qrcode';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PropuestasComponent } from './propuestas/propuestas.component';
import { LogInComponent } from './log-in/log-in.component';
import { FormsModule } from '@angular/forms';
import { RegistradoComponent } from './registrado/registrado.component';
import { EncabezadoComponent } from './encabezado/encabezado.component';
import { BarraDeNavegacionComponent } from './barra-de-navegacion/barra-de-navegacion.component';
import { PieDePaginaComponent } from './pie-de-pagina/pie-de-pagina.component';
import { SingUpComponent } from './sing-up/sing-up.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { LogInService } from './log-in.service';
import { JuegoService } from './juego.service';
import { PropuestasService } from './propuestas.service';
import { InterceptorInterceptor } from './interceptor.interceptor';
import { DetallesComponent } from './detalles/detalles.component';
import { ActividadComponent } from './actividad/actividad.component';
import { CrearPropuestaComponent } from './crear-propuesta/crear-propuesta.component';
import { CrearActividadComponent } from './crear-actividad/crear-actividad.component';
import { UnirsePropuestaComponent } from './unirse-propuesta/unirse-propuesta.component';
import { IngresarPseudonimoComponent } from './ingresar-pseudonimo/ingresar-pseudonimo.component';
import { PruebaJuegoComponent } from './prueba-juego/prueba-juego.component';
import { SalaComponent } from './para-pruebas/sala/sala.component';
import { MostrarResultadosComponent } from './para-pruebas/mostrar-resultados/mostrar-resultados.component';
import { RankingComponent } from './para-pruebas/ranking/ranking.component';
import { EsperaJuegoComponent } from './para-pruebas/espera-juego/espera-juego.component';
import { EsperaJugadorComponent } from './para-pruebas/espera-jugador/espera-jugador.component';


@NgModule({
  declarations: [
    AppComponent,
    PropuestasComponent,
    LogInComponent,
    RegistradoComponent,
    EncabezadoComponent,
    BarraDeNavegacionComponent,
    PieDePaginaComponent,
    SingUpComponent,
    DetallesComponent,
    ActividadComponent,
    CrearPropuestaComponent,
    CrearActividadComponent,
    UnirsePropuestaComponent,
    IngresarPseudonimoComponent,
    PruebaJuegoComponent,
    SalaComponent,
    MostrarResultadosComponent,
    RankingComponent,
    EsperaJuegoComponent,
    EsperaJugadorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    QRCodeModule

  ],
  providers: [HttpClient, LogInService, JuegoService, PropuestasService, {
    provide: HTTP_INTERCEPTORS,// indicamos que tipo de interceptor es.
    multi: true,
    useClass: InterceptorInterceptor
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
