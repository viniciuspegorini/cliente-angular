import { Component, OnInit, ViewChild } from '@angular/core';
import {DataTable} from 'primeng/components/datatable/datatable';
import { Serie } from '../model/serie';
import { SerieService } from './serie.service';
import { LazyLoadEvent, Message, ConfirmationService } from 'primeng/api';
import { Genero } from '../model/genero';
import { Produtora } from '../model/produtora';
import { GeneroService } from '../genero/genero.service';
import { ProdutoraService } from '../produtora/produtora.service';

@Component({
  selector: 'app-serie',
  templateUrl: './serie.component.html',
  styleUrls: ['./serie.component.css']
})
export class SerieComponent implements OnInit {

  @ViewChild('dt') dataTable: DataTable;

  series: Serie[];
  totalRecords: number;

  generos: Genero[];
  produtoras: Produtora[];
  produtorasFiltered: Produtora[];
  serieEdit: Serie = new Serie();

  showDialog = false;
  msgs: Message[] = [];

  constructor(private serieService: SerieService,
       private confirmationService: ConfirmationService,
       private generoService: GeneroService,
       private produtoraService: ProdutoraService) { }

  ngOnInit() {
    this.generoService.findAll().subscribe(
            e => this.generos = e);
    this.produtoraService.findAll().subscribe(
            e => this.produtoras = e);
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

  newEntity() {
    this.showDialog = true;
    this.serieEdit = new Serie();
    this.serieEdit.genero = this.generos[0];
  }

  search(event) {
    this.produtorasFiltered = this.produtoras
        .filter(
    p => p.nome.toLocaleLowerCase()
      .includes(event.query.toLocaleLowerCase())
    );
  }

  save() {
    this.serieService.save(this.serieEdit).
      subscribe(e => {
        this.serieEdit = new Serie();
        
        this.dataTable.reset();
        
        this.showDialog = false;
        this.msgs = [{
          severity: 'success',
          summary: 'Confirmado',
          detail: 'Registro salvo com sucesso'
        }];
      }, error => {
        this.msgs = [{
          severity: 'error',
          summary: 'Erro',
          detail: 'Certifique-se de preencher todos dos campos.'
        }];
      }
      );

  }
}
