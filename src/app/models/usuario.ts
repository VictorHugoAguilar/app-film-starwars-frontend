import { People } from './people';
import { Mail } from './mail';

export class Usuario {

  id: number = 0;
  usuario: String = '';
  password: String = '';

  people: People;
  mails: Mail[] = [];

}
