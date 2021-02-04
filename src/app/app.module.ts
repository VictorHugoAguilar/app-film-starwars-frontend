import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { HomeComponent } from './components/home/home.component';
import { PlanetComponent } from './components/planet/planet.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlanetFormComponent } from './components/planet-form/planet-form.component';
import { PeopleComponent } from './components/people/people.component';
import { PeopleFormComponent } from './components/people-form/people-form.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { UsuarioFormComponent } from './components/usuario-form/usuario-form.component';
import { Ocultar } from './pipes/ocultar.pipe';
import { ListaPipe } from './pipes/lista.pipe';
import { FilmFormComponent } from './components/film-form/film-form.component';
import { FilmComponent } from './components/film/film.component';
import { PeopleAsignarUsuarioModalComponent } from './components/people-asignar-usuario/people-asignar-usuario.component';
import { CortarPipe } from './pipes/cortar.pipe';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { UsuarioDetalleModalComponent } from './components/usuario-detalle-modal/usuario-detalle-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PlanetComponent,
    PlanetFormComponent,
    PeopleComponent,
    PeopleFormComponent,
    UsuarioComponent,
    UsuarioFormComponent,
    Ocultar,
    ListaPipe,
    FilmFormComponent,
    FilmComponent,
    PeopleAsignarUsuarioModalComponent,
    CortarPipe,
    UsuarioDetalleModalComponent
  ],
  entryComponents:[
    PeopleAsignarUsuarioModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    SweetAlert2Module,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatPseudoCheckboxModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatExpansionModule,
    MatDatepickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
