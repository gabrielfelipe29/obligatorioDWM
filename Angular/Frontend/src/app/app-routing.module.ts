import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { RegistradoComponent } from './registrado/registrado.component';
import { SingUpComponent } from './sing-up/sing-up.component';
import { DetallesComponent } from './detalles/detalles.component';
import { UnirsePropuestaComponent } from "./unirse-propuesta/unirse-propuesta.component";
import { InicioJuegoComponent } from "./inicio-juego/inicio-juego.component";
import { EsperaAdminComponent } from './espera-admin/espera-admin.component';
import { JuegoComponent } from './juego/juego.component';
import { EsperaJuegoComponent } from './espera-juego/espera-juego.component';
import { EsperaJugadorComponent } from './espera-jugador/espera-jugador.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicioSesion', pathMatch: 'full'}, 
  { path: 'inicioSesion', component: LogInComponent },
  { path: 'inicio', component: RegistradoComponent },
  { path: 'registro', component: SingUpComponent },
  { path: 'detalles/:id', component: DetallesComponent },
  { path: 'unirse-propuesta', component: UnirsePropuestaComponent },
  { path: 'inicio-juego', component: InicioJuegoComponent },
  { path: 'espera-admin', component: EsperaAdminComponent },
  { path: 'juego', component: JuegoComponent },
  { path: 'espera-juego', component: EsperaJuegoComponent }, 
  { path: 'espera-jugador', component:EsperaJugadorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }