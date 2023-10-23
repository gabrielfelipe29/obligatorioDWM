import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { RegistradoComponent } from './registrado/registrado.component';

const routes: Routes = [
  {path: '', redirectTo: '/inicioSesion', pathMatch: 'full'},
  {path:'inicioSesion', component: LogInComponent},
  {path:'inicio', component: RegistradoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
