import { Injectable } from '@angular/core';
import { BASE_ENDPOINT } from '../config/app';
import { CommonService } from './common.service';
import { HttpClient } from '@angular/common/http';
import { Planet } from '../models/planet';

@Injectable({
  providedIn: 'root'
})
export class PlanetService extends CommonService<Planet>{

  protected baseEndpoint = `${BASE_ENDPOINT}planet`;

  constructor(http: HttpClient) {
    super(http);
  }


}
