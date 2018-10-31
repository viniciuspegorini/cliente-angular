import { Injectable } from '@angular/core';
import { CrudService } from '../generic/crud.service';
import { Serie } from '../model/serie';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Page } from '../generic/page';

@Injectable({
  providedIn: 'root'
})
export class SerieService
    extends CrudService <Serie, number> {

  constructor(http: HttpClient) {
    super(environment.api + '/serie', http);
  }

  findSearchPageable(filter: string, page: number, size: number, order?: string, asc?: boolean): Observable<Page<Serie>> {
    let url = `${this.getUrl()}/search?filter=${filter}&page=${page}&size=${size}`;
    if (order) {
      url += `&order=${order}`;
    }
    if (asc !== undefined) {
      url += `&asc=${asc}`;
    }
    return this.http.get<Page<Serie>>(url);
  }

  searchCount(filter: string): Observable<number> {
    const url = `${this.getUrl()}/search/count?filter=${filter}`;
    return this.http.get<number>(url);
  }
}
