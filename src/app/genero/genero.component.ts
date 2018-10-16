import { Component, OnInit } from '@angular/core';
import { GeneroService } from './genero.service';
import { Genero } from '../model/genero';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-genero',
  templateUrl: './genero.component.html',
  styleUrls: ['./genero.component.css']
})
export class GeneroComponent implements OnInit {

  generos: Genero[];
  generoEdit = new Genero();
  showDialog = false;
  msgs: Message[] = [];

  constructor(private generoService: GeneroService) { }

  ngOnInit() {
    this.findAll();
  }

  findAll() {
    this.generoService.findAll().subscribe(
                    e => this.generos = e);
  }

  newEntity() {
    this.generoEdit = new Genero();
    this.showDialog = true;
  }

  cancel() {
    this.showDialog = false;
  }

  save() {
    this.generoService.save(this.generoEdit).
        subscribe( e => {
          this.generoEdit = new Genero();
          this.findAll();
          this.showDialog = false;
          this.msgs = [{severity: 'success',
                        summary: 'Confirmado',
                      detail: 'Registro salvo com sucesso'
                    }];
      }, error => {
        this.msgs = [{severity: 'error',
                        summary: 'Erro',
                      detail: 'Certifique-se de preencher todos dos campos.'
                    }];
      }
    );
  }

  edit(genero: Genero) {
    // this.generoEdit = genero;
    this.generoEdit = Object.assign({}, genero);
    this.showDialog = true;
  }
}
