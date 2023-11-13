import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { RegistradoComponent } from './registrado/registrado.component';
import { SingUpComponent } from './sing-up/sing-up.component';
import { DetallesComponent } from './detalles/detalles.component';
import { UnirseJuegoComponent } from './unirse-juego/unirse-juego.component';
import { CrearActividadComponent } from './crear-actividad/crear-actividad.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicioSesion', pathMatch: 'full'}, 
  { path: 'inicioSesion', component: LogInComponent },
  { path: 'inicio', component: RegistradoComponent },
  { path: 'registro', component: SingUpComponent },
  { path: 'detalles/:id', component: DetallesComponent },
  { path: 'unirseJuego', component: UnirseJuegoComponent },
  { path: 'crearActividad', component: CrearActividadComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }