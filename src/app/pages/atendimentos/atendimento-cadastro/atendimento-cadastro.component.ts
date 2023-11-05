import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ItensAtendimentos } from 'src/app/core/models/itensAtendimentos.model';
import { AuthService } from '../../seguranca/auth.service';
import { ConveniosService } from './../../convenios/convenios.service';
import { ExamesService } from './../../exames/exames.service';
import { PacientesService } from './../../pacientes/pacientes.service';
import { AtendimentosService } from './../atendimentos.service';

import { Atendimentos } from 'src/app/core/models/atendimentos.model';
import { Pacientes } from 'src/app/core/models/pacientes.model';
import { Regex } from 'src/app/core/validators/regex';

@Component({
  selector: 'app-atendimento-cadastro',
  templateUrl: './atendimento-cadastro.component.html',
  styleUrls: ['./atendimento-cadastro.component.css'],
})
export class AtendimentoCadastroComponent implements OnInit {
  messageDrop = 'Nenhum resultado encontrado...';
  regex = new Regex();
  traducao: any;
  atendimentos = new Atendimentos();
  pac = new Pacientes();
  pacientes = [];
  exames = [];
  convenios = [];
  novoAtendimento = false;
  exibirForm = false;
  exibirFormPaciente = false;
  exibirFormAlteracao = false;
  itensatendimento: ItensAtendimentos;
  atendIndex: number;
  convenioSelecionado: number;
  atendimento: string;
  idAtend: number;
  disabledExcluir: boolean;
  salvando: boolean;
  selectedPaciente: any;

  sexos = [
    { label: 'MASCULINO', value: 'MASCULINO' },
    { label: 'FEMININO', value: 'FEMININO' },
    { label: 'OUTROS', value: 'OUTROS' },
  ];

  formapagamentos = [
    { label: 'PIX', value: 'PIX' },
    { label: 'CARTÃO DÉBITO', value: 'CARTAO DEBITO' },
    { label: 'CARTÃO CRÉDITO', value: 'CARTAO CREDITO' },
    { label: 'DINHEIRO', value: 'DINHEIRO' },
  ];

  constructor(
    private atendService: AtendimentosService,
    private convService: ConveniosService,
    private pacService: PacientesService,
    private exameService: ExamesService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    public auth: AuthService,
    private confirmation: ConfirmationService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.carregarPacientes();
    this.carregarConvenios();
    this.atendimentos.status = true;
    this.idAtend = this.route.snapshot.params['id'];
    this.title.setTitle('Cadastro de Atendimento');

    if (this.idAtend) {
      this.carregarAtendimento(this.idAtend);
    } else {
      this.atendimentos.status = true;
    }
  }

  get editando() {
    return this.atendimentos && this.atendimentos.id;
  }

  carregarAtendimento(id: number) {
    this.atendService
      .buscarPorId(id)
      .then((obj) => {
        setTimeout(() => {
          this.selectedPaciente = this.pacientes.find(
            (pac) => pac.value === obj.paciente.id
          );
        }, 300);
        this.atendimentos = obj;
        this.atualizarTituloEdicao();
        this.spinner.hide();
      })
      .catch((erro) => {
        this.spinner.hide();
        this.errorHandler.handle(erro);
      });
  }

  prepararNovoAtendimento() {
    this.novoAtendimento = true;
    this.exibirForm = true;
    this.itensatendimento = new ItensAtendimentos();
    this.atendIndex = this.atendimentos.itensatendimento.length;
    this.itensatendimento.desconto = 0.0;
  }


  confirmarAtendimento(frm: NgForm) {
    this.carregarItensAtendimento(
      this.itensatendimento.idexame,
      this.itensatendimento.idconvenio
    );
    this.atendimentos.itensatendimento[this.atendIndex] =
      this.clonarAtendimento(this.itensatendimento);
    this.exibirForm = false;
    this.exibirFormAlteracao = false;
    frm.reset();
  }

  carregarConveniosporExame(id: number) {
    return this.convService
      .listarConveniosExame(id)
      .then((ex) => {
        this.convenios = ex.map((mp) => ({
          label: mp.descricao,
          value: mp.id,
        }));
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  carregarItensAtendimento(idexame: number, idconvenio: number) {
    this.atendService
      .buscarValores(idexame, idconvenio)
      .then((itensAtend) => {
        this.atendimentos.itensatendimento[this.atendIndex].idconvenio =
          itensAtend.idconvenio;
        this.atendimentos.itensatendimento[this.atendIndex].descricaoconvenio =
          itensAtend.descricaoconvenio;
        this.atendimentos.itensatendimento[this.atendIndex].idexame =
          itensAtend.idexame;
        this.atendimentos.itensatendimento[this.atendIndex].descricaoexame =
          itensAtend.descricaoexame;
        this.atendimentos.itensatendimento[this.atendIndex].preco =
          itensAtend.preco;
        this.atendimentos.itensatendimento[this.atendIndex].total =
          itensAtend.preco -
          this.atendimentos.itensatendimento[this.atendIndex].desconto;
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  removerAtendimento(index: number) {
    this.atendimentos.itensatendimento.splice(index, 1);
  }

  clonarAtendimento(atendimento: ItensAtendimentos): ItensAtendimentos {
    return new ItensAtendimentos(
      atendimento.idconvenio,
      atendimento.idexame,
      atendimento.descricaoconvenio,
      atendimento.descricaoexame,
      atendimento.preco,
      atendimento.total,
      atendimento.desconto,
      atendimento.acesso,
      atendimento.dataatendimento
    );
  }

  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizarAtendimento(form);
    } else {
      this.adicionarAtendimento(form);
    }
  }
  carregarPacientes() {
    return this.pacService
      .listarPacientes()
      .then((pac) => {
        this.pacientes = pac.map((mp) => ({ label: mp.nome, value: mp.id }));
        // if (this.idAtend) {
        //   this.spinner.show();
        //   this.carregarAtendimento(this.idAtend);
        // } else {
        //   this.atendimentos.status = true;
        // }
      })
      .catch((erro) => {
        this.errorHandler.handle(erro);
      });
  }

  carregarExames() {
    return this.exameService
      .listarExamesC(this.itensatendimento.idconvenio)
      .then((exa) => {
        this.exames = exa.map((mp) => ({ label: mp.descricao, value: mp.id }));
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }
  carregarConvenios() {
    return this.convService
      .listarConvenios()
      .then((ex) => {
        this.convenios = ex.map((mp) => ({
          label: mp.descricao,
          value: mp.id,
        }));
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }
  adicionarAtendimento(form: NgForm) {
    this.salvando = true;
    this.pacienteAtendimento();
    this.atendService
      .adicionar(this.atendimentos)
      .then((atendAdicionado) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Atendimento',
          detail: `adicionado com sucesso!`,
        });
        this.salvando = false;
        this.router.navigate(['/atendimentos']);
      })
      .catch((erro) => {
        this.salvando = false;
        this.errorHandler.handle(erro);
      });
  }
  atualizarAtendimento(form: NgForm) {
    this.salvando = true;
    this.pacienteAtendimento();
    // console.log(this.selectedPaciente);
    // console.log(this.atendimentos);
    this.atendService
      .atualizar(this.atendimentos)
      .then((atendimentos) => {
        this.atendimentos = atendimentos;
        this.messageService.add({
          severity: 'info',
          summary: 'Atendimento',
          detail: `alterado com sucesso!`,
        });
        this.salvando = false;
        this.router.navigate(['/atendimentos']);
        this.atualizarTituloEdicao();
      })
      .catch((erro) => {
        this.salvando = false;
        this.errorHandler.handle(erro);
      });
  }

  pacienteAtendimento() {
    this.atendimentos.paciente.id = this.selectedPaciente.value;
  }


  atualizarTituloEdicao() {
    this.title.setTitle(`${this.atendimentos.paciente.nome}`);
  }
  cadastrarPaciente() {
    this.exibirFormPaciente = true;
  }
  salvarPaciente(form: NgForm) {
    this.adicionarPaciente(form);
    this.carregarPacientes();
    form.reset();
    this.exibirFormPaciente = false;
  }
  adicionarPaciente(form: NgForm) {
    this.pacService
      .adicionar(this.pac)
      .then((pacAdicionado) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Paciente',
          detail: `${pacAdicionado.nome}, adicionado com sucesso!`,
        });
        this.carregarPacientes();
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  confirmarExclusao() {
    this.confirmation.confirm({
      message: `Tem certeza que deseja excluir: <b>${this.atendimentos.paciente.nome}</b> ?`,
      accept: () => {
        this.excluir(this.idAtend);
      },
      reject: (type) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'warn',
              summary: 'Ação cancelada',
              detail: 'Você cancelou',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'error',
              summary: 'Ação rejeitada',
              detail: 'Você rejeitou',
            });
            break;
        }
      },
    });
  }

  excluir(id: any) {
    this.atendService
      .excluir(id)
      .then(() => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Atendimento',
          detail: `${this.atendimentos.paciente.nome}, excluído com sucesso!`,
        });
        this.router.navigate(['/atendimentos']);
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  // preparaEdicaoAtendimento(atendimento: ItensAtendimentos, index: number) {
  //   this.novoAtendimento = false;
  //   atendimento.dataatendimento = moment(
  //     atendimento.dataatendimento,
  //     'YYYY-MM-DD'
  //   ).toDate();
  //   this.carregarConveniosporExame(atendimento.idexame);
  //   this.itensatendimento = this.clonarAtendimento(atendimento);
  //   this.exibirForm = false;
  //   this.exibirFormAlteracao = true;
  //   this.atendIndex = index;
  // }
}
