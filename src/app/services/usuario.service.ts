import { Injectable } from '@angular/core';
import { BASE_ENDPOINT } from '../config/app';
import { Usuario } from '../models/usuario';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioDetalle } from '../models/usuarioDetalle';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseEndpoint = `${BASE_ENDPOINT}usuarios`;

  constructor(private http: HttpClient) { }

  private cabeceras: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  public listar(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.baseEndpoint);
  }

  public listarPagina(page: string, size: string): Observable<any> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);
    // tslint:disable-next-line:object-literal-shorthand
    return this.http.get<any>(`${this.baseEndpoint}/pagina`, { params: params });
  }

  public ver(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.baseEndpoint}/${id}`);
  }

  public crear(e: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.baseEndpoint, e, { headers: this.cabeceras });
  }

  public editar(e: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.baseEndpoint}`, e, { headers: this.cabeceras });
  }

  public eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseEndpoint}/${id}`);
  }

  public crearConMail(e: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.baseEndpoint}/crear-con-mail`, e, { headers: this.cabeceras });
  }

  public modificarConMail(e: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.baseEndpoint}/modificar-con-mail`, e, { headers: this.cabeceras });
  }

  public listarUsuariosSinPeople(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseEndpoint}/buscar-usuario-sin-people`);
  }

  public verDetalle(name: String): Observable<UsuarioDetalle> {
    return this.http.get<UsuarioDetalle>(`${this.baseEndpoint}/buscar-usuario/${name}`);
  }

}
