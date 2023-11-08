import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { RegistradoComponent } from './registrado/registrado.component';
import { SingUpComponent } from './sing-up/sing-up.component';
import { DetallesComponent } from './detalles/detalles.component';
import { UnirsePropuestaComponent } from './unirse-propuesta/unirse-propuesta.component';
import { IngresarPseudonimoComponent } from './ingresar-pseudonimo/ingresar-pseudonimo.component';
import { PruebaJuegoComponent } from './prueba-juego/prueba-juego.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicioSesion', pathMatch: 'full'}, 
  { path: 'inicioSesion', component: LogInComponent },
  { path: 'inicio', component: RegistradoComponent },
  { path: 'registro', component: SingUpComponent },
  { path: 'detalles/:id', component: DetallesComponent },
  { path: 'unirsePropuesta', component: UnirsePropuestaComponent },
  { path: 'unirsePropuesta/:id', component: IngresarPseudonimoComponent },
  { path: 'pruebaQR', component: PruebaJuegoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }