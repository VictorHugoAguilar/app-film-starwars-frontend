import { Generic } from './generic';
import { People } from './people';
import { Film } from './fims';

export class Planet implements Generic {

  codigo: number = 0;
  name: String = '';
  diameter: String = '';
  rotationPeriod: String = '';
  orbitalPeriod: String = '';
  gravity: String = '';
  population: String = '';
  climate: String = '';
  terrain: String = '';
  surfaceWater: String = '';
  created: String = '';
  edited: String = '';

  peoples: People[] = [];
  films: Film[] = [];

 }
