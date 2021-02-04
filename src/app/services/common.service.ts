import { Observable } from 'rxjs';
import { Generic } from '../models/generic';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


export abstract class CommonService<E extends Generic>{

  // tslint:disable-next-line:no-inferrable-types
  protected baseEndpoint: string = '';

  constructor(protected http: HttpClient) { }

  protected cabeceras: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });


  public listar(): Observable<E[]> {
    return this.http.get<E[]>(this.baseEndpoint);
  }

  public listarPagina(page: string, size: string): Observable<any> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);
    // tslint:disable-next-line:object-literal-shorthand
    return this.http.get<any>(`${this.baseEndpoint}/pagina`, { params: params });
  }

  public ver(id: number): Observable<E> {
    return this.http.get<E>(`${this.baseEndpoint}/${id}`);
  }

  public crear(e: E): Observable<E> {
    return this.http.post<E>(this.baseEndpoint, e, { headers: this.cabeceras });
  }

  public editar(e: E): Observable<E> {
    return this.http.put<E>(`${this.baseEndpoint}`, e, { headers: this.cabeceras });
  }

  public eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseEndpoint}/${id}`);
  }
}
