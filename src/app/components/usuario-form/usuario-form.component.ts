import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Mail } from 'src/app/models/mail';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit {

  titulo: string = 'Crear Usuario nuevo';
  model: Usuario;
  error: any;
  nombreModel: string = '';
  redirect: string = '';

  constructor(private service: UsuarioService,
    private router: Router,
    private route: ActivatedRoute) {
    this.nombreModel = Usuario.name;
    this.redirect = '/usuario';
    this.model = new Usuario();

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id: number = +params.id;
      if (id) {
        this.service.ver(id).subscribe(m => {
          this.model = m;
          this.titulo = 'Editar ' + this.nombreModel;
        });
      }
    });
  }

  crear(): void {
    this.eliminarMailVacios();
    this.service.crearConMail(this.model).subscribe(
      usuario => {
        Swal.fire(
          'Creado!',
          `${this.nombreModel} ${usuario.usuario} creado con éxito!`,
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
    this.eliminarMailVacios();
    this.service.modificarConMail(this.model).subscribe(
      usuario => {
        Swal.fire(
          'Actualizado!',
          `${this.nombreModel} ${usuario.usuario} actualizado con éxito!`,
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

  agregarMail() {
    this.model.mails.push(new Mail());
  }

  asignarMail(mail: Mail, event: any): void {
    delete mail.id;
    mail.mail = event.target.value as string;
  }

  eliminarMail(mail: Mail): void {
    this.model.mails = this.model.mails.filter(m => m.mail !== mail.mail);
  }

  eliminarMailVacios(): void {
    this.model.mails = this.model.mails.filter(m => m.mail != null && m.mail.length > 0);
  }


}
