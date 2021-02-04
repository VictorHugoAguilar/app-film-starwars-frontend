import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PlanetComponent } from './components/planet/planet.component';
import { PlanetFormComponent } from './components/planet-form/planet-form.component';
import { PeopleComponent } from './components/people/people.component';
import { PeopleFormComponent } from './components/people-form/people-form.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { UsuarioFormComponent } from './components/usuario-form/usuario-form.component';
import { FilmComponent } from './components/film/film.component';
import { FilmFormComponent } from './components/film-form/film-form.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'planet', component: PlanetComponent },
  { path: 'planet/form', component: PlanetFormComponent },
  { path: 'planet/form/:codigo', component: PlanetFormComponent },
  { path: 'people', component: PeopleComponent },
  { path: 'people/form', component: PeopleFormComponent },
  { path: 'people/form/:codigo', component: PeopleFormComponent },
  { path: 'usuario', component: UsuarioComponent },
  { path: 'usuario/form', component: UsuarioFormComponent },
  { path: 'usuario/form/:id', component: UsuarioFormComponent },
  { path: 'film', component: FilmComponent },
  { path: 'film/form', component: FilmFormComponent },
  { path: 'film/form/:codigo', component: FilmFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
