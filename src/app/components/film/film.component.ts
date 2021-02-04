import { Component, OnInit, ViewChild } from '@angular/core';
import { Film } from '../../models/fims';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FilmService } from 'src/app/services/film.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit {

  nombreModel: string = '';
  titulo: string = '';
  lista: Film[] = [];
  totalRegistros: number = 0;
  paginaActual: number = 0;
  totalPorPaginas: number = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private serviceFilm: FilmService) {
    this.titulo = 'Gestion de Films';
    this.nombreModel = Film.name;
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
    this.serviceFilm.listarPagina(this.paginaActual.toString(), this.totalPorPaginas.toString()).subscribe(
      p => {
        this.lista = p.content as Film[];
        this.totalRegistros = p.totalElements as number;
        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
      }
    );
  }


  eliminar(film: Film): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: `¿Estás Seguro?`,
      text: `No se puede revertir la eliminación de ${film.title}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminarlo!',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.serviceFilm.eliminar(film.codigo).subscribe(
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
          `${this.nombreModel} ${film.title} no eliminado `,
          'error'
        );
      }
    });
  }

}
