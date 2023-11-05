import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { FilterService, LazyLoadEvent, MenuItem, PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Usuarios } from 'src/app/core/models/usuarios.model';
import { AuthService } from '../../seguranca/auth.service';
import { UsuariosService } from '../../usuarios/usuarios.service';
import { FiltroAtendimentoService } from './../../../core/services/filtros/filtro-atendimento.service';
import { RelatoriosService } from './../../relatorios/relatorios.service';
import { AtendimentosService } from './../atendimentos.service';

import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { Paginator } from 'primeng/paginator';
import { FiltrosAtendimentos } from 'src/app/core/models/filtro.model';
import { ItensAtendimentos } from 'src/app/core/models/itensAtendimentos.model';
import { ValidationService } from 'src/app/core/services/validations.service';
import { Regex } from 'src/app/core/validators/regex';


@Component({
  selector: 'app-atendimentos-lista',
  templateUrl: './atendimentos-lista.component.html',
  styleUrls: ['./atendimentos-lista.component.css']
})
export class AtendimentosListaComponent implements OnInit {

  // @ViewChild('tabela', { static: true }) table: Table;
  @ViewChild('tabela') table: Table;
  @ViewChild('paginator') paginator: Paginator;
  @ViewChild('buttonFilter') buttonFilter: ElementRef;

  regex = new Regex();
  itensAtend = new Array<ItensAtendimentos>();
  rowsPerPageTable: number[] = [10, 25, 50, 100, 200];
  rangeDates: Date[];
  usuario: Usuarios[];
  atendimentos = [];
  cols = [];
  colsItens = [];
  sinal = true;
  totalExames: number;
  atendimento: string;
  dateRangeStart: string;
  dateRangeEnd: string;
  restoringFilter: boolean;
  status = 'Ativo';
  messageDrop = 'Nenhum resultado encontrado...';
  valorTooltip = 'Inativos';
  displayExames: boolean;
  messagePageReport = 'Mostrando {first} a {last} de {totalRecords} registros';
  items: MenuItem[];
  selectedAtendimento: any;
  rangeDatesFiltroDataNasc: Date[];
  rangeDatesFiltroGravacao: Date[];
  totalRegistros = 0;
  totalPages = 0;
  first = 1;
  filtro = new FiltrosAtendimentos();
  timeout: any;
  datanascde: string;
  datanascate: string;
  datalancamentode: string;
  datalancamentoate: string;
  blockBtnFilter = false;

  sexos = [
    { label: 'MASCULINO', value: 'MASCULINO' },
    { label: 'FEMININO', value: 'FEMININO' },
    { label: 'OUTROS', value: 'OUTROS' }
  ];

  formaPagamentos = [
    { label: 'CARTAO DEBITO', value: 'CARTAO DEBITO' },
    { label: 'CARTAO CREDITO', value: 'CARTAO CREDITO' },
    { label: 'DINHEIRO', value: 'DINHEIRO' }
  ];

  constructor(
    private title: Title,
    private atendService: AtendimentosService,
    private userService: UsuariosService,
    private relatoriosService: RelatoriosService,
    private errorHandler: ErrorHandlerService,
    private filterService: FilterService,
    public auth: AuthService,
    private conf: PrimeNGConfig,
    private validationService: ValidationService,
    private spinner: NgxSpinnerService,
    private filtroAtendimento: FiltroAtendimentoService
  ) { }

  onClear() {
    this.cols.forEach(col => {
      if (col.qty === null || col.qty === undefined) { } else {
        col.qty = null;
      }
    });
    this.datanascde = null;
    this.datanascate = null;
    this.datalancamentode = null;
    this.datalancamentoate = null;
    this.filtro = new FiltrosAtendimentos();
    this.filtroDefault();
    this.carregarAtendimentos();
  }



  ngOnInit() {
    this.filtroDefault();
    this.conf.ripple = true;
    this.title.setTitle('Atendimentos');

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
      { field: 'idficha', header: 'Ficha', width: '130px', type: 'numeric' },
      { field: 'id', header: 'Atendimento', width: '130px', type: 'numeric' },
      { field: 'nome', header: 'Paciente', width: '200px', type: 'text' },
      { field: 'datanasc', header: 'Data Nasc', width: '100px', data: true, format: `dd/MM/yyyy`, type: 'date' },
      { field: 'sexo', header: 'Sexo', width: '130px', type: 'text' },
      { field: 'formapagamento', header: 'Forma de Pagamento', width: '175px', type: 'text' },
      { field: 'emailusuario', header: 'Usuário', width: '150px', type: 'text' },
      { field: 'datalancamento', header: 'Data Sistema', width: '150px', data: true, format: `dd/MM/yyyy H:mm`, type: 'date' }
    ];
    this.colsItens = [
      { field: 'acesso', header: 'Acesso' },
      { field: 'descricaoexame', header: 'Exame' },
      { field: 'descricaoconvenio', header: 'Convênio' },
      { field: 'dataatendimento', header: 'Data Atendimento', data: true, format: `dd/MM/yyyy` },
      { field: 'preco', header: 'Preço', currency: true, format: `BRL` },
      { field: 'desconto', header: 'Desconto', currency: true, format: `BRL` },
      { field: 'total', header: 'Total', currency: true, format: `BRL` }
    ];

    this.filterService.register('customCreatedDateFilter', (value: string, filter) => {

      if (this.dateRangeStart === value && this.dateRangeEnd === undefined) {
        return true;
      }

      if (this.dateRangeStart === value || this.dateRangeEnd === value) {
        return true;
      }

      if (
        this.dateRangeStart !== undefined &&
        this.dateRangeEnd !== undefined &&
        moment(this.dateRangeStart).isBefore(value) &&
        moment(this.dateRangeEnd).isAfter(value)) {
        return true;
      }

      return false;
    });

    //  this.carregarAtendimentos();
    // this.carregarUsers();

  }

  filtroDefault() {
    this.filtro.pagina = 0;
    this.filtro.itensPorPagina = 10;
    this.filtro.status = 'Ativos';
  }

  changePage(event: LazyLoadEvent) {
    this.filtro.pagina = event.first / event.rows;
    this.filtro.itensPorPagina = event?.rows;
    this.carregarAtendimentos();
  }


  refresh() {
    this.carregarAtendimentos();
  }
  showItens(atendId: number) {
    this.atendService.listarItensAtend(atendId)
      .then(obj => {
        this.itensAtend = obj;
      });
    this.displayExames = true;
  }


  gerarAtendimento(atend: any) {
    this.relatoriosService.atendimento(atend.id.toString())
      .then(relatorio => {
        const url = window.URL.createObjectURL(relatorio);
        window.open(url);
      });
  }



  carregarUsers() {
    return this.userService.listarUsuarios()
      .then(user => {
        this.usuario = user
          .map(mp => ({ label: mp.nome, value: mp.id }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarAtendimentos() {
    this.spinner.show();
    this.atendService.listarComFiltro(this.filtro)
      .then(obj => {
        this.atendimentos = obj.content;
        this.totalRegistros = obj.totalElements;
        this.totalPages = obj.totalPages;
        this.atendimentos = this.validationService.formataAtivoeInativo(this.atendimentos);
        this.spinner.hide();
      })
      .catch((erro) => {
        this.spinner.hide();
        this.errorHandler.handle(erro);
      });

  }

  AlternarLista() {
    if (this.filtro.status === 'Ativos') {
      this.filtro.status = 'Inativos';
    } else {
      this.filtro.status = 'Ativos';
    }
    this.carregarAtendimentos();
  }

  searchData(tipo: string) {
    if (tipo === 'datanascde') {
      if (this.datanascde && this.datanascde.length === 10) {
        const dia = this.datanascde.substring(0, 2);
        const mes = this.datanascde.substring(3, 5);
        const ano = this.datanascde.substring(6, 10);
        this.filtro.datanascde = ano + '-' + mes + '-' + dia;
      } else {
        this.filtro.datanascde = '';
      }
    }
    if (tipo === 'datanascate') {
      if (this.datanascate && this.datanascate.length === 10) {
        const dia = this.datanascate.substring(0, 2);
        const mes = this.datanascate.substring(3, 5);
        const ano = this.datanascate.substring(6, 10);
        this.filtro.datanascate = ano + '-' + mes + '-' + dia;
      } else {
        this.filtro.datanascate = '';
      }
    }
    if (tipo === 'datalancamentode') {
      if (this.datalancamentode && this.datalancamentode.length === 10) {
        const dia = this.datalancamentode.substring(0, 2);
        const mes = this.datalancamentode.substring(3, 5);
        const ano = this.datalancamentode.substring(6, 10);
        this.filtro.datalancamentode = ano + '-' + mes + '-' + dia;
      } else {
        this.filtro.datalancamentode = '';
      }
    }
    if (tipo === 'datalancamentoate') {
      if (this.datalancamentoate && this.datalancamentoate.length === 10) {
        const dia = this.datalancamentoate.substring(0, 2);
        const mes = this.datalancamentoate.substring(3, 5);
        const ano = this.datalancamentoate.substring(6, 10);
        this.filtro.datalancamentoate = ano + '-' + mes + '-' + dia;
      } else {
        this.filtro.datalancamentoate = '';
      }
    }
    if (this.timeout) { clearTimeout(this.timeout); }
    this.timeout = setTimeout(() => {
      this.carregarAtendimentos();
      this.FirstPage();
    }, 800);
  }

  search(value: any) {
    if (this.timeout) { clearTimeout(this.timeout); }
    this.timeout = setTimeout(() => {
      this.applySearch(value);
    }, 800);
  }

  applySearch(value: any) {
    this.blockBtnFilter = true;
    if (
      value.qty === null ||
      value.qty === undefined
    ) {
      this.btnBlock();
    } else {
      this.filtroAtendimento.filtro(value, this.filtro).then((obj) => {
        this.filtro = obj;
        this.carregarAtendimentos();
        this.FirstPage();
        this.btnBlock();
      }).catch((erro) => {
        this.spinner.hide();
        this.btnBlock();
        this.errorHandler.handle(erro);
      });
    }
  }
  FirstPage() {
    this.paginator.changePage(0);
  }

  verifyFocus() {
    this.buttonFilter.nativeElement.focus();
  }

  btnBlock() {
    setTimeout(() => {
      this.blockBtnFilter = false;
    }, 680);
  }

  limparData(tipo: string) {
    if (tipo === 'dataNasc') {
      this.filtro.datanascde = '';
      this.filtro.datanascate = '';
      this.datanascde = '';
      this.datanascate = '';
    }
    if (tipo === 'dataLancamento') {
      this.filtro.datalancamentode = '';
      this.filtro.datalancamentoate = '';
      this.datalancamentode = '';
      this.datalancamentoate = '';
    }

    this.carregarAtendimentos();
  }

}
