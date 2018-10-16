import { Injectable } from '@angular/core';
import { Serie } from '../model/serie';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CrudService } from '../generic/crud.service';
import { Observable } from 'rxjs';

@Injectable()
export class SerieService extends CrudService<Serie, number> {

  constructor(http: HttpClient) {
    super(environment.api + '/serie', http);
  }

}
