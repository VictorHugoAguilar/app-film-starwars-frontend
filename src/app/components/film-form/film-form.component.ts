import { Component, OnInit } from '@angular/core';
import { People } from '../../models/people';
import { PlanetService } from 'src/app/services/planet.service';
import { FilmService } from '../../services/film.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Film } from '../../models/fims';
import { Planet } from '../../models/planet';
import { PeopleService } from '../../services/people.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-film-form',
  templateUrl: './film-form.component.html',
  styleUrls: ['./film-form.component.css']
})
export class FilmFormComponent implements OnInit {

  titulo: string = 'Crear Film nuevo';
  model: Film;
  error: any;
  nombreModel: string = '';
  redirect: string = '';
  listaPlanet: Planet[] = [];
  listaPeople: People[] = [];
  planet: Planet;

  constructor(private servicePeople: PeopleService,
    private servicePlanet: PlanetService,
    private serviceFilm: FilmService,
    private router: Router,
    private route: ActivatedRoute) {
    this.nombreModel = Film.name;
    this.redirect = '/film';
    this.model = new Film();
  }

  ngOnInit(): void {
    this.initPlanets();
    this.initPeoples();
    this.route.params.subscribe(params => {
      const codigo: number = +params.codigo;
      if (codigo) {
        this.serviceFilm.ver(codigo).subscribe(m => {
          this.model = m;
          this.titulo = 'Editar ' + this.nombreModel;
        });
      }
    });
  }


  crear(): void {
    this.eliminarVacios();
    this.serviceFilm.crear(this.model).subscribe(
      film => {
        Swal.fire(
          'Creado!',
          `${this.nombreModel} ${film.title} creado con éxito!`,
          'success'
        );
        this.router.navigate([this.redirect]);
      },
      err => {
        if (err.status === 400) {
          this.error = err.error;
          console.error(this.error);
        }
      }
    );

  }

  editar(): void {
    this.eliminarVacios();
    this.serviceFilm.editar(this.model).subscribe(
      film => {
        Swal.fire(
          'Creado!',
          `${this.nombreModel} ${film.title} creado con éxito!`,
          'success'
        );
        this.router.navigate([this.redirect]);
      },
      err => {
        if (err.status === 400) {
          this.error = err.error;
          console.error(this.error);
        }
      }
    );
  }



  agregarPlanet(): void {
    this.model.planets.push(new Planet());
  }

  asignarPlanet(planet: Planet, event: any): void {
    planet.codigo = event.target.value as number;
  }

  eliminarPlanet(planet: Planet): void {
    this.model.planets = this.model.planets.filter(p => p.codigo !== planet.codigo);
  }

  agregarPeople(): void {
    this.model.peoples.push(new People());
  }

  asignarPeople(people: People, event: any): void {
    people.codigo = event.target.value as number;
  }


  eliminarPeople(people: People): void {
    this.model.peoples = this.model.peoples.filter(p => p.codigo !== people.codigo);
  }



  eliminarVacios(): void {
    this.model.planets = this.model.planets.filter(m => m.codigo != null && m.codigo > 0);
    this.model.peoples = this.model.peoples.filter(m => m.codigo != null && m.codigo > 0);
  }



  initPlanets(): void {
    this.servicePlanet.listar().subscribe(
      p => {
        this.listaPlanet = p as Planet[];
      },
      err => {
        console.error('No se han podido cargar los planetas', err);
      }
    );
  }

  initPeoples(): void {
    this.servicePeople.listar().subscribe(
      p => {
        this.listaPeople = p as People[];
      },
      err => {
        console.error('No se han podido cargar las peoples', err);
      }
    );
  }

}
