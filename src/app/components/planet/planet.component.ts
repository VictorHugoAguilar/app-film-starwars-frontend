import { Component, OnInit, ViewChild } from '@angular/core';
import { PlanetService } from '../../services/planet.service';
import { Planet } from 'src/app/models/planet';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.css']
})
export class PlanetComponent implements OnInit {

  nombreModel: string = '';
  titulo: string = '';
  lista: Planet[] = [];
  totalRegistros: number = 0;
  paginaActual: number = 0;
  totalPorPaginas: number = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private service: PlanetService) {
    this.titulo = 'Gestion de Planetas';
    this.nombreModel = Planet.name;
  }

  ngOnInit(): void {
    this.calcularRangos();
  }

  paginar(event: PageEvent): void {
    this.paginaActual = event.pageIndex;
    this.totalPorPaginas = event.pageSize;
    this.calcularRangos();
  }

  private calcularRangos(): void {
    this.service.listarPagina(this.paginaActual.toString(), this.totalPorPaginas.toString()).subscribe(
      p => {
        this.lista = p.content as Planet[];
        this.totalRegistros = p.totalElements as number;
        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
      }
    );
  }

  eliminar(planet: Planet): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: `¿Estás Seguro?`,
      text: `No se puede revertir la eliminación de ${planet.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminarlo!',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.eliminar(planet.codigo).subscribe(
          () => {
            this.calcularRangos();
            swalWithBootstrapButtons.fire(
              'Eliminado!',
              `El ${this.nombreModel} ha sido eliminado.`,
              'success'
            );
          }
        );
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          `${this.nombreModel} ${planet.name} no eliminado `,
          'error'
        );
      }
    });
  }


}
