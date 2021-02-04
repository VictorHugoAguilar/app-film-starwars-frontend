import { Component, OnInit } from '@angular/core';
import { People } from '../../models/people';
import { PeopleService } from '../../services/people.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { PlanetService } from 'src/app/services/planet.service';
import { Planet } from 'src/app/models/planet';

@Component({
  selector: 'app-people-form',
  templateUrl: './people-form.component.html',
  styleUrls: ['./people-form.component.css']
})
export class PeopleFormComponent implements OnInit {

  titulo: string = 'Crear Personaje nuevo';
  model: People;
  error: any;
  nombreModel: string = '';
  redirect: string = '';
  listaPlanets: Planet[] = [];
  currentPlanet: Planet;


  constructor(private servicePeople: PeopleService,
    private servicePlanet: PlanetService,
    private router: Router,
    private route: ActivatedRoute) {
    this.nombreModel = People.name;
    this.redirect = '/people';
    this.model = new People();
  }

  ngOnInit(): void {
    this.cargarPlanets();
    this.route.params.subscribe(params => {
      const codigo: number = +params.codigo;
      if (codigo) {
        this.servicePeople.ver(codigo).subscribe(m => {
          this.model = m;
          this.currentPlanet = m.planet;
          this.titulo = 'Editar ' + this.nombreModel;
        });
      }else{
        this.currentPlanet = new Planet();
      }
    });
  }

  cargarPlanets(): void {
    this.servicePlanet.listar().subscribe(
      planet => {
        this.listaPlanets = planet as Planet[];
      },
      err => {
        console.error(err);
      }
    );
  }

  crear(): void {
    this.servicePeople.crear(this.model).subscribe(
      people => {
        Swal.fire(
          'Creado!',
          `${this.nombreModel} ${people.name} creado con éxito!`,
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
    this.servicePeople.editar(this.model).subscribe(
      m => {
        Swal.fire(
          'Actualizado!',
          `${this.nombreModel} ${m.name} actualizado con éxito!`,
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

  selectPlanet(codigo: number): void {
    this.currentPlanet = new Planet();
    this.currentPlanet.codigo = codigo;
    this.model.planet = this.currentPlanet;
  }

  compararPlanet(a1: Planet, a2: Planet): boolean {
    if (a1 === undefined && a2 === undefined) {
      return true;
    }
    return (a1 === null || a2 === null || a1 === undefined || a2 === undefined) ? false : (a1.codigo === a2.codigo);
  }

}
