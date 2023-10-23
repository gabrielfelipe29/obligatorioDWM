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

@NgModule({
  declarations: [
    AppComponent,
    PropuestasComponent,
    LogInComponent,
    RegistradoComponent,
    EncabezadoComponent,
    BarraDeNavegacionComponent,
    PieDePaginaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
