import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { NgxSpinnerService } from 'ngx-spinner';
import { LazyLoadEvent, MenuItem, PrimeNGConfig } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { FiltroPacienteService } from 'src/app/core/services/filtros/filtro-paciente.service';

import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { FiltrosPacientes } from 'src/app/core/models/filtro.model';
import { AuthService } from '../../seguranca/auth.service';
import { PacientesService } from './../pacientes.service';


@Component({
  selector: 'app-pacientes-lista',
  templateUrl: './pacientes-lista.component.html',
  styleUrls: ['./pacientes-lista.component.css']
})
export class PacientesListaComponent implements OnInit {

  @ViewChild('tabela') table: Table;
  @ViewChild('paginator') paginator: Paginator;
  @ViewChild('buttonFilter') buttonFilter: ElementRef;

  rowsPerPageTable: number[] = [10, 25, 50, 100, 200];
  pacientes = [];
  sinal = true;
  status = 'Ativo';
  cols: any[];
  salvando: boolean;
  dateRangeStart: string;
  dateRangeEnd: string;
  filtro = new FiltrosPacientes();
  selectedPaciente: any;
  rangeDatesFiltroDataNasc: Date[];
  rangeDatesFiltroGravacao: Date[];
  totalRegistros = 0;
  messageDrop = 'Nenhum resultado encontrado...';
  valorTooltip = 'Inativos';
  messagePageReport = 'Mostrando {first} a {last} de {totalRecords} registros';
  items: MenuItem[];
  timeout: any;
  datanascde: string;
  datanascate: string;
  datagravacaode: string;
  datagravacaoate: string;
  totalPages = 0;
  first = 1;
  blockBtnFilter = false;


  sexos = [
    { label: 'MASCULINO', value: 'MASCULINO' },
    { label: 'FEMININO', value: 'FEMININO' },
    { label: 'OUTROS', value: 'OUTROS' }
  ];

  constructor(
    private title: Title,
    private pacService: PacientesService,
    public auth: AuthService,
    private conf: PrimeNGConfig,
    private errorHandler: ErrorHandlerService,
    private spinner: NgxSpinnerService,
    private filtroPaciente: FiltroPacienteService
  ) { }

  onClear() {
    this.cols.forEach(col => {
      if (col.qty === null || col.qty === undefined) { } else {
        col.qty = null;
      }
    });
    this.datanascde = null;
    this.datanascate = null;
    this.datagravacaode = null;
    this.datagravacaoate = null;
    this.filtro = new FiltrosPacientes();
    this.filtroDefault();
    this.carregarPacientes();
  }


  refresh() {
    this.carregarPacientes();
  }

  ngOnInit() {
    this.filtroDefault();
    this.conf.ripple = true;
    this.title.setTitle('Pacientes');
    // this.carregarPacientes();

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
      { field: 'id', header: 'Código', width: '130px', type: 'numeric' },
      { field: 'cpf', header: 'Cpf', width: '130px', type: 'numeric' },
      { field: 'nome', header: 'Nome', width: '250px', type: 'text' },
      { field: 'datanasc', header: 'Data Nasc.', width: '145px', type: 'date', data: true, format: `dd/MM/yyyy` },
      { field: 'sexo', header: 'Sexo', width: '130px', type: 'text' },
      { field: 'datagravacao', header: 'Data Gravação', width: '170px', type: 'date', data: true, format: `dd/MM/yyyy H:mm` },
      { field: 'emailusuario', header: 'Usuário Gravação', width: '190px', type: 'text' }
    ];

  }

  filtroDefault() {
    this.filtro.pagina = 0;
    this.filtro.itensPorPagina = 10;
    this.filtro.status = 'Ativos';
  }

  changePage(event: LazyLoadEvent) {
    this.filtro.pagina = event.first / event.rows;
    this.filtro.itensPorPagina = event?.rows;
    this.carregarPacientes();
  }



  carregarPacientes() {
    this.spinner.show();
    this.pacService.listarComFiltro(this.filtro)
      .then(obj => {
        this.pacientes = obj.content;
        this.totalRegistros = obj.totalElements;
        this.totalPages = obj.totalPages;
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
    this.carregarPacientes();
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
    if (tipo === 'datagravacaode') {
      if (this.datagravacaode && this.datagravacaode.length === 10) {
        const dia = this.datagravacaode.substring(0, 2);
        const mes = this.datagravacaode.substring(3, 5);
        const ano = this.datagravacaode.substring(6, 10);
        this.filtro.datagravacaode = ano + '-' + mes + '-' + dia;
      } else {
        this.filtro.datagravacaode = '';
      }
    }
    if (tipo === 'datagravacaoate') {
      if (this.datagravacaoate && this.datagravacaoate.length === 10) {
        const dia = this.datagravacaoate.substring(0, 2);
        const mes = this.datagravacaoate.substring(3, 5);
        const ano = this.datagravacaoate.substring(6, 10);
        this.filtro.datagravacaoate = ano + '-' + mes + '-' + dia;
      } else {
        this.filtro.datagravacaoate = '';
      }
    }
    if (this.timeout) { clearTimeout(this.timeout); }
    this.timeout = setTimeout(() => {
      this.carregarPacientes();
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
      this.filtroPaciente.filtro(value, this.filtro).then((obj) => {
        this.filtro = obj;
        this.carregarPacientes();
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
    if (tipo === 'dataGravacao') {
      this.filtro.datagravacaode = '';
      this.filtro.datagravacaoate = '';
      this.datagravacaode = '';
      this.datagravacaoate = '';
    }

    this.carregarPacientes();
  }
}
