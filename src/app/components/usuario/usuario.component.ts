import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioDetalleModalComponent } from '../usuario-detalle-modal/usuario-detalle-modal.component';
import { UsuarioDetalle } from '../../models/usuarioDetalle';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  nombreModel: string = '';
  titulo: string = '';
  lista: Usuario[] = [];
  totalRegistros: number = 0;
  paginaActual: number = 0;
  totalPorPaginas: number = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private serviceUsuario: UsuarioService,
    public dialog: MatDialog) {
    this.titulo = 'Gestion de Usuarios';
    this.nombreModel = Usuario.name;
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
    this.serviceUsuario.listarPagina(this.paginaActual.toString(), this.totalPorPaginas.toString()).subscribe(
      p => {
        this.lista = p.content as Usuario[];
        this.totalRegistros = p.totalElements as number;
        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
      }
    );
  }

  eliminar(usuario: Usuario): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: `¿Estás Seguro?`,
      text: `No se puede revertir la eliminación de ${usuario.usuario}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminarlo!',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.serviceUsuario.eliminar(usuario.id).subscribe(
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
          `${this.nombreModel} ${usuario.usuario} no eliminado `,
          'error'
        );
      }
    });
  }


  verDetalleUsuario(usuario: Usuario): void {
    const modalRef = this.dialog.open(UsuarioDetalleModalComponent, {
      width: '960px',
      data: { usuario }
    });

    modalRef.afterClosed().subscribe(() => {
    });

  }

}
