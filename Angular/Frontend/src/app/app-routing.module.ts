import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { SingUpComponent } from './sing-up/sing-up.component';
import { DetallesComponent } from './detalles/detalles.component';
import { UnirsePropuestaComponent } from "./unirse-propuesta/unirse-propuesta.component";
import { InicioJuegoComponent } from "./inicio-juego/inicio-juego.component";
import { JuegoComponent } from './juego/juego.component';
import { IngresarPseudonimoComponent } from './ingresar-pseudonimo/ingresar-pseudonimo.component';
import { EsperaJugadorComponent } from './espera-jugador/espera-jugador.component';
import { EsperaJuegoComponent } from './espera-juego/espera-juego.component';
import { RespuestasComponent } from './respuestas/respuestas.component';
import { CrearPropuestaComponent } from './crear-propuesta/crear-propuesta.component';
import { RankingComponent } from './ranking/ranking.component';
import { PropuestasComponent } from './propuestas/propuestas.component';


const routes: Routes = [
  { path: '', redirectTo: '/inicioSesion', pathMatch: 'full'}, 
  { path: 'inicioSesion', component: LogInComponent },
  { path: 'registro', component: SingUpComponent },
  { path: 'inicio', component: PropuestasComponent },
  { path: 'detalles/:id', component: DetallesComponent },
  { path: 'unirsePropuesta', component: UnirsePropuestaComponent },
  { path: 'inicioJuego', component: InicioJuegoComponent },
  { path: 'juego', component: JuegoComponent },
  { path: 'unirsePropuesta/:id', component: IngresarPseudonimoComponent },
  { path: 'actividad', component: JuegoComponent },
  { path: 'esperaJugador', component: EsperaJugadorComponent },
  { path: 'restultadoActividad', component: RespuestasComponent },
  {path :'ranking',component:RankingComponent},
  {path :'crearpropuesta',component:CrearPropuestaComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }