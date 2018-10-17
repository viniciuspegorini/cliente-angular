import { Component, OnInit, ViewChild } from '@angular/core';
import {DataTable} from 'primeng/components/datatable/datatable';
import { Serie } from '../model/serie';
import { SerieService } from './serie.service';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-serie',
  templateUrl: './serie.component.html',
  styleUrls: ['./serie.component.css']
})
export class SerieComponent implements OnInit {

  @ViewChild('dt') dataTable: DataTable;

  series: Serie[];
  totalRecords: number;

  constructor(private serieService: SerieService) { }

  ngOnInit() {
  }

  findAllPaged(page: number, size: number) {
    this.serieService.count().subscribe(e =>
      this.totalRecords = e);
    this.serieService.findPageable(page, size)
      .subscribe(e => this.series = e.content);
  }

  load(event: LazyLoadEvent) {
    const currentPage = event.first / event.rows;
    const maxRecords = event.rows;
    setTimeout(() => {
      this.findAllPaged(currentPage, maxRecords);
    }, 250);
  }

}
