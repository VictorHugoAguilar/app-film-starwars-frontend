import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { People } from '../../models/people';
import { Usuario } from '../../models/usuario';
import { PeopleService } from '../../services/people.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-people-asignar-usuario',
  templateUrl: './people-asignar-usuario.component.html',
  styleUrls: ['./people-asignar-usuario.component.css']
})
export class PeopleAsignarUsuarioModalComponent implements OnInit {

  titulo: String = '';
  people: People;
  listaUsuarios: Usuario[];
  usuario: Usuario;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public modalRef: MatDialogRef<PeopleAsignarUsuarioModalComponent>,
    private servicePeople: PeopleService
  ) {
  }


  ngOnInit(): void {
    this.titulo = 'Asignar Usuario a Personaje';
    this.people = this.data.people as People;
    this.listaUsuarios = this.data.listaUsuarios as Usuario[];
  }


  cancelar(): void {
    this.modalRef.close();
  }

  asignar(): void {
    this.servicePeople.asignarUsuarioAPeople(this.people, this.usuario).subscribe(
      people => {
        Swal.fire(
          'Asignado!',
          `${this.usuario.usuario} asignado a ${this.people.name} con éxito!`,
          'success'
        );
      },
      error => {
        console.error(error);
      }
    );
    this.modalRef.close();
  }

}
