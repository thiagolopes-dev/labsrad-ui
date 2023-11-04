import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { MenuItem } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { FiltrosPacientes } from 'src/app/core/models/filtro.model';
import { FiltroPacienteService } from 'src/app/core/services/filtros/filtro-paciente.service';
import { PacientesService } from '../pacientes.service';

@Component({
  selector: 'app-pacientes-lista',
  templateUrl: './pacientes-lista.component.html',
  styleUrls: ['./pacientes-lista.component.css']
})
export class PacientesListaComponent implements OnInit {

  @ViewChild('tabela') table: Table;
  @ViewChild('paginator') paginator: Paginator;
  @ViewChild('buttonFilter') buttonFilter: ElementRef;

  rowsPerPageTable: number[] = [10, 25, 50, 100, 200, 500];
  pacientes = [];
  cols: any[];
  salvando: boolean;
  dateRangeStar: string;
  dateRangeEnd: string;
  filtro = new FiltrosPacientes();
  selectedPaciente: any;
  rangeDatesFiltroDataNasc: Date[];
  rangeDatesFiltroGravacao: Date[];
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
    {label: 'MASCULINO', value: 'M'},
    {label: 'FEMININO', value: 'F'},
    {label: 'OUTROS', value: 'O'}
  ]

  constructor(
    private title: Title,
    private pacienteService: PacientesService,
    private spinner: NgxSpinnerService,
    private filtroPaciente: FiltroPacienteService,
     // private auth: AuthService,
    // private errorHandler: ErrorHandlerService,
  ) { }

  ngOnInit() {
    this.filtroDefault();
    this.title.setTitle('Lista de Pacientes');
    this.items = [
      {
        label: 'Ativos/Inativos',
        icon: 'pi pi-sort-alt',
        command: () => {
         // this.alternarLista();
        }
      }
    ]

    this.cols = [
      {field: 'id', header: 'Código', width: '130px', type: 'numeric', qty: '', key: 1},
      {field: 'nome', header: 'Nome', width: '200px', type: 'text', qty: '', key: 2},
      {field: 'cpf', header: 'CPF', width: '100px', type: 'text', qty: '', key: 3},
      {field: 'datanasc', header: 'Data Nasc.', width: '130px', type: 'date', 
      data: true, format: `dd/MM/yyyy H:mm` ,qty: '', key: 4},
      {field: 'sexo', header: 'Sexo', width: '100px', type: 'text', qty: '', key: 5},
      {field: 'datagravacao', header: 'Data Grav.', width: '130px', type: 'date',
      data: true, format: `dd/MM/yyyy H:mm` ,qty: '', key: 6},
      {field: 'emailusuario', header: 'Usuário Grav.', width: '130px', type: 'text', qty: '', key: 7},
      {field: 'status', header: 'Status', width: '100px', type: 'text', qty: '', key: 8},
    ]
  }

  filtroDefault(){
    this.filtro.pagina = 0;
    this.filtro.itensPorPagina = 10;
    this.filtro.status = 'Ativos';
  }

  onClear(){
    this.cols.forEach(col => {
      if(col.qty === null || col.qty === undefined) { } else {
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

  refresh(){
    this.carregarPacientes();
  }

  carregarPacientes(){}

}
