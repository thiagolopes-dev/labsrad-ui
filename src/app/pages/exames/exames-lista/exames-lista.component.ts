import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ValidationService } from 'src/app/core/services/validations.service';

import { AuthService } from '../../seguranca/auth.service';
import { ExamesService } from '../exames.service';
import { ItensConvenios } from 'src/app/core/models/itensConvenios.model';

@Component({
  selector: 'app-exames-lista',
  templateUrl: './exames-lista.component.html',
  styleUrls: ['./exames-lista.component.css']
})
export class ExamesListaComponent implements OnInit {

  @ViewChild('tabela') table: Table;

  rowsPerPageTable: number[] = [10, 25, 50, 100, 200];
  itensConv = new Array<ItensConvenios>();
  exames = [];
  sinal = true;
  status = 'Ativo';
  cols: any[];
  tabela: any;
  valorTooltip = 'Inativos';
  messagePageReport = 'Mostrando {first} a {last} de {totalRecords} registros';
  items: MenuItem[];
  colsConv = [];
  displayExames: boolean;

  constructor(
    private title: Title,
    private examesService: ExamesService,
    public auth: AuthService,
    private conf: PrimeNGConfig,
    private errorHandler: ErrorHandlerService,
    private validationService: ValidationService,
    private spinner: NgxSpinnerService
  ) { }

  onClear() {
    this.table.clear();
  }
  refresh() {
    this.carregarExames();
  }

  ngOnInit() {
    this.conf.ripple = true;
    this.title.setTitle('Exames');

    this.items = [
      {
        label: 'Ativo / Inativo',
        icon: 'pi pi-sort-alt',
        command: () => {
          this.AlternarLista();
        },
      }
    ];

    this.cols = [
      { field: 'id', header: 'Código', width: '115px', type: 'numeric' },
      { field: 'descricao', header: 'Descrição', width: '250px', type: 'text' },
      { field: 'datagravacao', header: 'Data Gravação', width: '200px', type: 'date', data: true, format: `dd/MM/yyyy H:mm` },
      { field: 'emailusuario', header: 'Usuário Gravação', width: '250px', type: 'text' },
      { field: 'statusformatado', header: 'Status', width: '100px', type: 'text' }
    ];

    this.colsConv = [
      {field: 'id', header: 'Código'},
      {field: 'descricao', header: 'Convênio'},
      {field: 'preco', header: 'Preço',  currency: true,  format: `BRL`}
    ]

    this.carregarExames();
  }

  carregarExames() {
    this.spinner.show();
    this.examesService.listarExames()
      .then(exame => {
        this.exames = exame;
        this.exames = this.validationService.formataAtivoeInativo(this.exames);
        this.spinner.hide();
      })
      .catch((erro) => {
        this.spinner.hide();
        this.errorHandler.handle(erro);
      });

  }

  showConvenios(id: number) {
    this.examesService.listarExamesConvenios(id)
      .then(obj => {
        this.itensConv = obj;
      });
    this.displayExames = true;
  }

  AlternarLista() {
    this.spinner.show();
    const valor = this.sinal ? '/inativos' : '/';
    if (this.sinal === true) {
      this.valorTooltip = 'Ativos';
      this.sinal = false;
    } else {
      this.valorTooltip = 'Inativos';
      this.sinal = true;
    }
    this.examesService.AlternarLista(valor)
      .then(obj => {
        this.exames = obj
        this.exames = this.validationService.formataAtivoeInativo(this.exames);
        this.spinner.hide();
      })
      .catch((erro) => {
        this.spinner.hide();
        this.errorHandler.handle(erro);
      });

  }
}
