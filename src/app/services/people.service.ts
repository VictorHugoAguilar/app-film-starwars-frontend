import { Injectable } from '@angular/core';
import { BASE_ENDPOINT } from '../config/app';
import { People } from '../models/people';
import { CommonService } from './common.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeopleService extends CommonService<People>{

  protected baseEndpoint = `${BASE_ENDPOINT}people`;

  constructor(http: HttpClient) {
    super(http);
  }

  public asignarUsuarioAPeople(people: People, usuario: Usuario ): Observable<People> {
    return this.http.put<People>(`${this.baseEndpoint}/${people.codigo}/asignar-usuario`, usuario, { headers: this.cabeceras });
  }

  public quitarUsuarioDePeople(people: People, usuario: Usuario ): Observable<People> {
    return this.http.put<People>(`${this.baseEndpoint}/${people.codigo}/eliminar-usuario`, usuario, { headers: this.cabeceras });
  }

  public buscarPeople(name: string, page: string, size: string): Observable<any> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);
    // tslint:disable-next-line:object-literal-shorthand
    return this.http.get<any>(`${this.baseEndpoint}/buscar/${name}`, { params: params });
  }

}
