import { Generic } from './generic';
import { Usuario } from './usuario';
import { Planet } from './planet';
import { Film } from './fims';

export class People implements Generic {

  codigo: number=0;
  name: String = '';
  gender: String = '';
  height: String = '';
  mass: String = '';
  birthYear: String = '';
  eyeColor: String = '';
  hairColor: String = '';
  skinColor: String = '';
  created: String = '';
  edited: String = '';

  films: Film[] = [];
  planet: Planet;
  usuario: Usuario;

}
