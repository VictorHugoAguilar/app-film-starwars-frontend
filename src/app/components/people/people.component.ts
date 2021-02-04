import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { People } from '../../models/people';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { PeopleService } from '../../services/people.service';
import { MatDialog } from '@angular/material/dialog';
import { PeopleAsignarUsuarioModalComponent } from '../people-asignar-usuario/people-asignar-usuario.component';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  nombreModel: string = '';
  titulo: string = '';
  lista: People[] = [];
  listaUsuarios: Usuario[] = [];
  usuario: Usuario;
  totalRegistros: number = 0;
  paginaActual: number = 0;
  totalPorPaginas: number = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private servicePeople: PeopleService,
    private serviceUsuarios: UsuarioService,
    public dialog: MatDialog) {
    this.titulo = 'Gestion de Personajes';
    this.nombreModel = People.name;

  }

  ngOnInit(): void {
    this.calcularRangos();
    this.cargarListaUsuarios();
  }

  paginar(event: PageEvent): void {
    this.paginaActual = event.pageIndex;
    this.totalPorPaginas = event.pageSize;
    this.calcularRangos();
  }

  private calcularRangos(): void {
    this.servicePeople.listarPagina(this.paginaActual.toString(), this.totalPorPaginas.toString()).subscribe(
      p => {
        this.lista = p.content as People[];
        this.totalRegistros = p.totalElements as number;
        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
      }
    );
  }

  eliminar(people: People): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: `¿Estás Seguro?`,
      text: `No se puede revertir la eliminación de ${people.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminarlo!',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicePeople.eliminar(people.codigo).subscribe(
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
          `${this.nombreModel} ${people.name} no eliminado `,
          'error'
        );
      }
    });
  }

  asignarUsuarioPeople(people: People): void {
    const modalRef = this.dialog.open(PeopleAsignarUsuarioModalComponent, {
      width: '750px',
      data: { people: people, listaUsuarios: this.listaUsuarios }
    });

    modalRef.afterClosed().subscribe(() => {
      this.calcularRangos();
    });

  }

  cargarListaUsuarios(): void {
    this.serviceUsuarios.listarUsuariosSinPeople().subscribe(
      u => {
        this.listaUsuarios = u as Usuario[];
      }
    );
  }

  eliminarUsuarioPeople(people: People): void {
    this.servicePeople.quitarUsuarioDePeople(people, people.usuario).subscribe(
      p => {
        Swal.fire(
          'Desasignado:',
          'Usuario desasignado del Personaje',
          'success'
        );
        this.calcularRangos();
      }, err => {
        console.error(err);
      }
    );
  }

  filtrar(name: string): void {
    if (name.length === 0) {
      this.calcularRangos();
      return;
    }
    this.calcularRangosBusqueda(name);
  }

  private calcularRangosBusqueda(name: string): void {
    this.servicePeople.buscarPeople(name, this.paginaActual.toString(), this.totalPorPaginas.toString()).subscribe(
      p => {
        this.lista = p.content as People[];
        this.totalRegistros = p.totalElements as number;
        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
      },
      error => { console.error(error); }
    );
  }

}
