import { ConveniosService } from './../../convenios/convenios.service';
import { PrimeNGConfig } from 'primeng/api';
import { RelatoriosService } from './../relatorios.service';
import { UsuariosService } from './../../usuarios/usuarios.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../seguranca/auth.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {


  dataInicio: Date;
  dataFim: Date;
  mes: string;
  mes1: string;
  ano: string;
  ano1: string;
  convenio: string;
  usuario: string;
  traducao: any;
  usuarios = [];
  convenios = [];


  meses = [
    { label: 'Janeiro', value: '1' },
    { label: 'Fevereiro', value: '2' },
    { label: 'Março', value: '3' },
    { label: 'Abril', value: '4' },
    { label: 'Maio', value: '5' },
    { label: 'Junho', value: '6' },
    { label: 'Julho', value: '7' },
    { label: 'Agosto', value: '8' },
    { label: 'Setembro', value: '9' },
    { label: 'Outubro', value: '10' },
    { label: 'Novembro', value: '11' },
    { label: 'Dezembro', value: '12' }
  ];

  anos = [
    { label: '2022', value: '2022' },
    { label: '2023', value: '2023' },
    { label: '2024', value: '2024' },
    { label: '2025', value: '2025' },
    { label: '2026', value: '2026' },
    { label: '2027', value: '2027' },
  ];


  constructor(
    private relatoriosService: RelatoriosService,
    private title: Title,
    private userService: UsuariosService,
    private convenioService: ConveniosService,
    private errorHandler: ErrorHandlerService,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.title.setTitle('Relatórios');
    this.carregarUsuarios();
    this.carregarConvenios();
  }
  gerarAtendimentoFiltro() {
   this.relatoriosService.relatorioAtendimentoFiltro(this.dataInicio, this.dataFim)
   .then(relatorio => {
     const url = window.URL.createObjectURL(relatorio);
     window.open(url);
   });
  }
  gerarMensalUsuario() {
    this.relatoriosService.relatorioMensalUsuario(this.mes1, this.ano1, this.usuario)
    .then(relatorio => {
      const url = window.URL.createObjectURL(relatorio);
      window.open(url);
    });
   }
   gerarMensal() {
    this.relatoriosService.relatorioMensal(this.mes, this.ano)
    .then(relatorio => {
      const url = window.URL.createObjectURL(relatorio);
      window.open(url);
    });
   }
   gerarMensalConvenio() {
    this.relatoriosService.relatorioMensalConvenio(this.mes, this.ano, this.convenio)
    .then(relatorio => {
      const url = window.URL.createObjectURL(relatorio);
      window.open(url);
    });
   }
   gerarConvenios() {
    this.relatoriosService.relatorioConvenios()
    .then(relatorio => {
      const url = window.URL.createObjectURL(relatorio);
      window.open(url);
    });
   }
   gerarExames() {
    this.relatoriosService.relatorioExames()
    .then(relatorio => {
      const url = window.URL.createObjectURL(relatorio);
      window.open(url);
    });
   }
   gerarUsuarios() {
    this.relatoriosService.relatorioUsuarios()
    .then(relatorio => {
      const url = window.URL.createObjectURL(relatorio);
      window.open(url);
    });
   }
  carregarUsuarios() {
    return this.userService.listarUsuarios()
      .then(user => {
        this.usuarios = user
          .map(mp => ({ label: mp.nome, value: mp.id }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarConvenios() {
    return this.convenioService.listarConvenios()
      .then(obj => {
        this.convenios = obj
          .map(mp => ({ label: mp.descricao, value: mp.id }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
