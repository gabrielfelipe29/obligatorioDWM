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
import { LogInService } from './services/log-in.service';
import { JuegoService } from './services/juego.service';
import { PropuestasService } from './services/propuestas.service';
import { InterceptorInterceptor } from './interceptor.interceptor';
import { DetallesComponent } from './detalles/detalles.component';
import { ActividadComponent } from './actividad/actividad.component';
import { CrearPropuestaComponent } from './crear-propuesta/crear-propuesta.component';
import { CrearActividadComponent } from './crear-actividad/crear-actividad.component';
import { UnirsePropuestaComponent } from './unirse-propuesta/unirse-propuesta.component';
import { IngresarPseudonimoComponent } from './ingresar-pseudonimo/ingresar-pseudonimo.component';
import { VotosComponent } from './votos/votos.component';
import { JuegoComponent } from './juego/juego.component';
import { CommonModule } from '@angular/common';
import { InicioJuegoComponent } from './inicio-juego/inicio-juego.component';
import { EsperaJugadorComponent } from './espera-jugador/espera-jugador.component';
import { RespuestasComponent } from './respuestas/respuestas.component';
import { TodasLasActividadesComponent } from './todas-las-actividades/todas-las-actividades.component';
import { VeractividadesComponent } from './veractividades/veractividades.component';



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
    IngresarPseudonimoComponent,
    VotosComponent,
    JuegoComponent,
    InicioJuegoComponent,
    EsperaJugadorComponent, 
    RespuestasComponent,
    TodasLasActividadesComponent,
    VeractividadesComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule

  ],
  providers: [HttpClient, LogInService, JuegoService, PropuestasService, {
    provide: HTTP_INTERCEPTORS,// indicamos que tipo de interceptor es.
    multi: true,
    useClass: InterceptorInterceptor
  }],
  bootstrap: [AppComponent]
})

export class AppModule { }
