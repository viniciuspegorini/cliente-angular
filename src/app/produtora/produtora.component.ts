import { Component, OnInit } from '@angular/core';
import { Produtora } from '../model/produtora';
import { ProdutoraService } from './produtora.service';
import { ConfirmationService, Message } from 'primeng/api';

@Component({
  selector: 'app-produtora',
  templateUrl: './produtora.component.html',
  styleUrls: ['./produtora.component.css']
})
export class ProdutoraComponent implements OnInit {

  produtoras: Produtora[];
  cols: any[];
  produtoraEdit = new Produtora();
  showDialog = false;
  msgs: Message[] = [];

  constructor(private produtoraService: ProdutoraService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.findAll();
    this.cols = [
      { field: 'id', header: 'Código' },
      { field: 'nome', header: 'Nome' }
    ];
  }

  findAll() {
    this.produtoraService.findAll().subscribe(
      e => this.produtoras = e);
  }

  newEntity() {
    this.produtoraEdit = new Produtora();
    this.showDialog = true;
  }

  cancel() {
    this.showDialog = false;
  }

  save() {
    this.produtoraService.save(this.produtoraEdit).
      subscribe(e => {
        this.produtoraEdit = new Produtora();
        this.findAll();
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

  edit(produtora: Produtora) {
    this.produtoraEdit = Object.assign({}, produtora);
    this.showDialog = true;
  }

  delete(produtora: Produtora) {
    this.confirmationService.confirm({
      message: 'Essa ação não pode ser desfeita.',
      header: 'Deseja remover esse registro?',
      acceptLabel: 'Confirmar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.produtoraService.delete(produtora.id)
          .subscribe(() => {
            this.findAll();
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
}
