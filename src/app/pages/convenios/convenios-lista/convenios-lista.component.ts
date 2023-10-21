import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { ValidationService } from 'src/app/core/services/validation.service';
import { ConveniosService } from '../convenios.service';

@Component({
  selector: 'app-convenios-lista',
  templateUrl: './convenios-lista.component.html',
  styleUrls: ['./convenios-lista.component.css']
})
export class ConveniosListaComponent implements OnInit {

  @ViewChild('tabela') table: Table;
  rowsPerPageTable: number[] = [10, 25, 50, 100, 200, 500];
  convenios = [];
  cols: any[];
  messagePageReport = 'Mostrando {first} a {last} de {totalRecords} registros';
  items: MenuItem[];
  sinal = true;
  valorTooltip = 'Inativos';

  constructor(
    private title: Title,
    private convService: ConveniosService,
    private spinner: NgxSpinnerService,
    private validationService: ValidationService
  ) { }

  ngOnInit() {
    this.title.setTitle('Lista de Convênios');
    this.items = [
      {
        label: 'Ativo/Inativo',
        icon: 'pi pi-sort-alt',
        command: () => {
          this.AlternarLista();
        }
      }
    ]
    this.carregarConvenios();

    this.cols = [
      { field: 'id', header: 'Código', width: '100px', type: 'numeric', key: 1 },
      { field: 'descricao', header: 'Descrição', width: '150px', type: 'text', key: 2 },
      { field: 'datagravacao', header: 'Data Gravação', width: '100px', data: true, format: `dd/MM/yyyy H:mm`, type: 'date', key: 3 },
      { field: 'emailusuario', header: 'Usuário Gravação', width: '150px', type: 'text', key: 4 },
      { field: 'statusformatado', header: 'Status', width: '150px', type: 'text', key: 5 }
    ]
  }

  carregarConvenios() {
    this.spinner.show();
    this.convService.listarConvenios()
      .then((obj) => {
        this.convenios = obj;
        this.convenios = this.validationService.formataAtivoeInativo(this.convenios);
        this.spinner.hide();
      })
      .catch((erro) => {
        this.spinner.hide();
        // this.erroHandler.handle(erro);
      })
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
    this.convService.AlternarLista(valor)
      .then((obj) => {
        this.convenios = obj;
        // this.convenios = this.validationService.formataAtivoeInativo(this.convenios);
        this.spinner.hide();
      })
      .catch((erro) => {
        this.spinner.hide();
        // this.erroHandler.handle(erro);
      })
  }
  refresh(){
    this.carregarConvenios();
  }
  onClear(){
    this.table.clear();
  }
}
