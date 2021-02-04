import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioDetalle } from '../../models/usuarioDetalle';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-usuario-detalle-modal',
  templateUrl: './usuario-detalle-modal.component.html',
  styleUrls: ['./usuario-detalle-modal.component.css']
})
export class UsuarioDetalleModalComponent implements OnInit {

  titulo: string = '';
  usuarioDetalle: UsuarioDetalle;
  usuario: Usuario;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public modalRef: MatDialogRef<UsuarioDetalleModalComponent>,
    private serviceUsuario: UsuarioService
  ) {
  }

  ngOnInit(): void {
    this.titulo = 'Detalles del Usuario';
    this.usuario = this.data.usuario as Usuario;
    this.cargarDetalles();
  }

  cargarDetalles(): void {
    this.serviceUsuario.verDetalle(this.usuario.usuario).subscribe(
      u => {
        this.usuarioDetalle = u as UsuarioDetalle;
      }
    );
  }


}
