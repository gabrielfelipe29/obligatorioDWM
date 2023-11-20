import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { UnirseJuegoComponent } from './unirse-juego/unirse-juego.component';
import { InicioJuegoComponent } from './inicio-juego/inicio-juego.component';
import { EsperaAdminComponent } from './espera-admin/espera-admin.component';
import { EsperaJuegoComponent } from './espera-juego/espera-juego.component';
import { EsperaJugadorComponent } from './espera-jugador/espera-jugador.component';
import { JuegoComponent } from './juego/juego.component';
import { RankingComponent } from './ranking/ranking.component';
import { RespuestasComponent } from './respuestas/respuestas.component';

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
    UnirseJuegoComponent,
    InicioJuegoComponent,
    EsperaAdminComponent,
    EsperaJuegoComponent,
    EsperaJugadorComponent,
    JuegoComponent,
    RankingComponent,
    RespuestasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule

  ],
  providers: [HttpClient, LogInService, JuegoService, PropuestasService, {
    provide: HTTP_INTERCEPTORS,// indicamos que tipo de interceptor es.
    multi: true,
    useClass: InterceptorInterceptor
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
