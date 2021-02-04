import { Generic } from './generic';
import { Planet } from './planet';
import { People } from './people';

export class Film implements Generic {

  codigo: number = 0;
  title: String = '';
  episodeId: number = 0;
  openingCrawl: String = '';
  producer: String = '';
  director: String = '';
  releaseDate: String = '';
  created: String = '';
  edited: String = '';

  planets: Planet[] = [];
  peoples: People[] = [];

}
