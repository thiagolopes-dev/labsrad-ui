import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ValidationService } from 'src/app/core/services/validations.service';
import { AuthService } from '../../seguranca/auth.service';
import { PatrimoniosService } from '../patrimonios.service';

@Component({
  selector: 'app-patrimonios-lista',
  templateUrl: './patrimonios-lista.component.html',
  styleUrls: ['./patrimonios-lista.component.css']
})
export class PatrimoniosListaComponent implements OnInit {

  
  @ViewChild('tabela') table: Table;

  rowsPerPageTable: number[] = [10, 25, 50, 100, 200];
  messagePageReport = 'Mostrando {first} a {last} de {totalRecords} registros';
  patrimonios = [];
  sinal = true;
  status = 'Ativo';
  cols: any[];
  tabela: any;
  items: MenuItem[];
  
  constructor(
    private title: Title,
    private patrimonioService: PatrimoniosService,
    public auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private validationService: ValidationService,
    private spinner: NgxSpinnerService
  ) { }

 
  onClear() {
    this.table.clear();
  }
  refresh() {
    this.carregarPatrimonios();
  }

  ngOnInit() {
    this.title.setTitle('Patrimônios');

    this.items = [
      {
        label: 'Ativo / Inativo',
        icon: 'pi pi-sort-alt',
        command: () => {
          this.AlternarLista();
        },
      }
    ];

    this.carregarPatrimonios();


    this.cols = [
      { field: 'id', header: 'Código', width: '115px', type: 'numeric' },
      { field: 'descricao', header: 'Descrição',type: 'text', width: '250px' },
      { field: 'valor', header: 'Valor',type: 'numeric', width: '200px',  currency: true,  format: `BRL` },
      { field: 'descempresa', header: 'Empresa',type: 'text', width: '250px' },
      { field: 'dataaquisicao', header: 'Data Aquisição',type: 'date', width: '250px', data: true, format: `dd/MM/yyyy` },
      { field: 'datagravacao', header: 'Data Gravação', type: 'date', width: '200px', data: true, format: `dd/MM/yyyy H:mm` },
      { field: 'emailusuario', header: 'Usuário Gravação', type: 'text', width: '250px' },
      { field: 'statusformatado', header: 'Status', width: '100px', type: 'text' }
    ];
  }

  carregarPatrimonios() {
    this.spinner.show();
    this.patrimonioService.listar()
      .then(obj => {
        this.patrimonios = obj;
        this.patrimonios = this.validationService.formataAtivoeInativo(this.patrimonios);
        this.spinner.hide();
      })
      .catch((erro) => {
        this.spinner.hide();
        this.errorHandler.handle(erro);
      });

  }

  AlternarLista() {
    const valor = this.sinal ? '/inativos' : '/';
    if (this.sinal === true) {
      this.sinal = false;
    } else {
      this.sinal = true;
    }
    this.spinner.show();
    this.patrimonioService.AlternarLista(valor)
      .then(obj => {
        this.patrimonios = obj
        this.patrimonios = this.validationService.formataAtivoeInativo(this.patrimonios);
        this.spinner.hide();
      })
      .catch((erro) => {
        this.spinner.hide();
        this.errorHandler.handle(erro);
      });
  }

}
