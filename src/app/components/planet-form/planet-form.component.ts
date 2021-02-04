import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Planet } from 'src/app/models/planet';
import { PlanetService } from '../../services/planet.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-planet-form',
  templateUrl: './planet-form.component.html',
  styleUrls: ['./planet-form.component.css']
})
export class PlanetFormComponent implements OnInit {

  titulo: string = 'Crear Planeta nuevo';
  model: Planet;
  error: any;
  nombreModel: string = '';
  redirect: string = '';

  constructor(private service: PlanetService,
    private router: Router,
    private route: ActivatedRoute) {
    this.nombreModel = Planet.name;
    this.redirect = '/planet';
    this.model = new Planet();

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const codigo: number = +params.codigo;
      if (codigo) {
        this.service.ver(codigo).subscribe(m => {
          this.model = m;
          this.titulo = 'Editar ' + this.nombreModel;
        });
      }
    });
  }

  crear(): void {
    this.service.crear(this.model).subscribe(
      planet => {
        Swal.fire(
          'Creado!',
          `${this.nombreModel} ${planet.name} creado con éxito!`,
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
    this.service.editar(this.model).subscribe(
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

}
