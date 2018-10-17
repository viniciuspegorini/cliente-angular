import { Injectable } from '@angular/core';
import { CrudService } from '../generic/crud.service';
import { Serie } from '../model/serie';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SerieService
    extends CrudService <Serie, number> {

  constructor(http: HttpClient) {
    super(environment.api + '/serie', http);
  }
}
