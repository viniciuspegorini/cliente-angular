import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTable } from 'primeng/components/datatable/datatable';
import { Serie } from '../model/serie';
import { SerieService } from './serie.service';
import { LazyLoadEvent, Message, ConfirmationService } from 'primeng/api';
import { Genero } from '../model/genero';
import { Produtora } from '../model/produtora';
import { GeneroService } from '../genero/genero.service';
import { ProdutoraService } from '../produtora/produtora.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-serie',
  templateUrl: './serie.component.html',
  styleUrls: ['./serie.component.css']
})
export class SerieComponent implements OnInit {

  @ViewChild('dt') dataTable: DataTable;

  cols: any[];
  series: Serie[];
  totalRecords: number;

  generos: Genero[];
  produtoras: Produtora[];
  produtorasFiltered: Produtora[];
  serieEdit: Serie = new Serie();

  showDialog = false;
  msgs: Message[] = [];

  uploadedFiles: any[] = [];
  urlApi: string = environment.api;
  today: number = Date.now();

  constructor(private serieService: SerieService,
    private confirmationService: ConfirmationService,
    private generoService: GeneroService,
    private produtoraService: ProdutoraService) { }

  ngOnInit() {
    this.generoService.findAll().subscribe(
      e => this.generos = e);
    this.produtoraService.findAll().subscribe(
      e => this.produtoras = e);
    this.cols = [
      { field: 'id', header: 'Código' },
      { field: 'nome', header: 'Nome' },
      { field: 'nota', header: 'Nota' },
      { field: 'dataEstreia', header: 'Estréia' },
      { field: 'dataEncerramento', header: 'Encerramento' },
      { field: 'genero.nome', header: 'Gênero' },
      { field: 'produtora.nome', header: 'Produtora' },
    ];
  }

  findAllPaged(page: number, size: number) {
    this.serieService.count().subscribe(e =>
      this.totalRecords = e);
    this.serieService.findPageable(page, size)
      .subscribe(e => this.series = e.content);
  }

  findSearchPaged(filter: string, page: number, size: number) {
    this.serieService.searchCount(filter).subscribe(e => this.totalRecords = e);
    this.serieService.findSearchPageable(filter, page, size).subscribe(e => this.series = e.content);
  }

  load(event: LazyLoadEvent) {
    const currentPage = event.first / event.rows;
    const maxRecords = event.rows;
    if (event.globalFilter) {
      setTimeout(() => {
        this.findSearchPaged(event.globalFilter, currentPage, maxRecords);
      }, 250);
    } else {
      setTimeout(() => {
        this.findAllPaged(currentPage, maxRecords);
      }, 250);
    }
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

  cancel() {
    this.showDialog = false;
  }

  edit(serie: Serie) {
    this.today = Date.now();
    this.serieEdit = Object.assign({}, serie);
    this.showDialog = true;
  }

  delete(serie: Serie) {
    this.confirmationService.confirm({
      message: 'Essa ação não pode ser desfeita.',
      header: 'Deseja remover esse registro?',
      acceptLabel: 'Confirmar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.serieService.delete(serie.id)
          .subscribe(() => {
            this.dataTable.reset();
            this.msgs = [{
              severity: 'success',
              summary: 'Removido',
              detail: 'Registro removido com sucesso'
            }];
          }, error => {
            this.msgs = [{
              severity: 'error',
              summary: 'Erro',
              detail: 'Falha ao remover registro.'
            }];
          });
      }
    });
  }

  onUpload(event) {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }
    this.msgs = [{
      severity: 'info',
      summary: 'Arquivo salvo!',
      detail: 'Arquivo salvo com sucesso.'
    }];
    setTimeout(() => {
      this.dataTable.reset();
      this.showDialog = false;
      this.uploadedFiles = [];
    }, 500);
  }
}
