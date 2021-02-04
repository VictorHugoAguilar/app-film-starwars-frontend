import { Injectable } from '@angular/core';
import { BASE_ENDPOINT } from '../config/app';
import { Film } from '../models/fims';
import { CommonService } from './common.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FilmService extends CommonService<Film>{

  protected baseEndpoint = `${BASE_ENDPOINT}films`;

  constructor(http: HttpClient) {
    super(http);
  }


}
