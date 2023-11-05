import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ItensConvenios } from './../../../core/models/itensConvenios.model';
import { ConveniosService } from './../../convenios/convenios.service';

import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';


import { NgForm } from '@angular/forms';
import { Convenios } from 'src/app/core/models/convenios.model';
import { Exames } from 'src/app/core/models/exames.model';
import { Regex } from 'src/app/core/validators/regex';
import { AuthService } from '../../seguranca/auth.service';
import { ExamesService } from '../exames.service';

@Component({
  selector: 'app-exame-cadastro',
  templateUrl: './exame-cadastro.component.html',
  styleUrls: ['./exame-cadastro.component.css'],
})
export class ExameCadastroComponent implements OnInit {
  @ViewChild('frmItens') frmItens: NgForm;
  regex = new Regex();
  exames = new Exames();
  convexame: ItensConvenios;
  convexames: ItensConvenios[] = [];
  exibirForm = false;
  convenios = [];
  colsItens = [];
  convenio: Convenios;
  itensIndex: number;
  messageDrop = 'Nenhum resultado encontrado...';
  idexame: number;
  disabledExcluir: boolean;
  salvando: boolean;

  constructor(
    private examesService: ExamesService,
    private convService: ConveniosService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private confirmation: ConfirmationService,
    public auth: AuthService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.exames.status = true;
    this.idexame = this.route.snapshot.params['id'];
    this.title.setTitle('Cadastro de Exame');
    this.carregarConvenios();

    this.colsItens = [
      { field: 'descricaoconvenio', header: 'Convênio', width: '200px' },
      {
        field: 'preco',
        header: 'Preço',
        width: '200px',
        currency: true,
        format: `BRL`,
      },
    ];

    if (this.idexame) {
      this.spinner.show();
      this.carregarExame(this.idexame);
    } else {
      this.exames.status = true;
    }
  }

  prepararNovo() {
    this.exibirForm = true;
    this.convexame = new ItensConvenios();
    this.itensIndex = this.exames.examesconvenios.length;
  }

  preparaEdicao(convenioexame: ItensConvenios, index: number) {
    this.convexame = this.clonar(convenioexame);
    this.exibirForm = true;
    this.itensIndex = index;
  }

  confirmar(frm: NgForm) {
    this.exames.examesconvenios[this.itensIndex] = this.clonar(this.convexame);
    this.carregarDescricaoConvenio(this.convexame.idconvenio);
    this.exibirForm = false;
    frm.reset();
  }
  yesDelete(index: number) {
    this.confirmation.confirm({
      // message: `<b>${ this.auth.jwtPayload?.user_name}</b>, Tem certeza que deseja sair? `,
      message: `Tem certeza que deseja remover ? `,
      accept: () => {
        this.remover(index);
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

  remover(index: number) {
    this.exames.examesconvenios.splice(index, 1);
  }

  clonar(item: ItensConvenios): ItensConvenios {
    return new ItensConvenios(
      item.idconvenio,
      item.descricaoconvenio,
      item.preco
    );
  }
  carregarDescricaoConvenio(id: number) {
    this.examesService
      .buscarDescricaoConvenio(id)
      .then((conv) => {
        this.convenio = conv;
        this.exames.examesconvenios[this.itensIndex].descricaoconvenio =
          conv.descricao;
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }
  get editandoItem() {
    return this.convexame && this.convexame.idconvenio;
  }
  get editando() {
    return Boolean(this.exames.id);
  }
  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizarExame(form);
    } else {
      this.adicionarExame(form);
    }
  }
  adicionarExame(form: NgForm) {
    this.salvando = true;
    this.examesService
      .adicionar(this.exames)
      .then((exameAdicionado) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Exame',
          detail: `${exameAdicionado.descricao}, adicionado com sucesso!`,
        });
        this.salvando = false;
        this.router.navigate(['/exames']);
      })
      .catch((erro) => {
        this.salvando = false;
        this.errorHandler.handle(erro);
      });
  }
  atualizarExame(form: NgForm) {
    this.salvando = true;
    this.examesService
      .atualizar(this.exames)
      .then((exames) => {
        this.exames = exames;
        this.messageService.add({
          severity: 'info',
          summary: 'Exame',
          detail: `alterado com sucesso!`,
        });
        // this.atualizarTituloEdicao();
        this.salvando = false;
        this.router.navigate(['/exames']);
      })
      .catch((erro) => {
        this.salvando = false;
        this.errorHandler.handle(erro);
      });
  }
  carregarConvenios() {
    return this.convService
      .listarConvenios()
      .then((conv) => {
        this.convenios = conv.map((mp) => ({
          label: mp.descricao,
          value: mp.id,
        }));
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }
  carregarExame(id: number) {
    this.examesService
      .buscarPorId(id)
      .then((exames) => {
        this.exames = exames;
        this.spinner.hide();
      })
      .catch((erro) => {
        this.spinner.hide();
        this.errorHandler.handle(erro);
      });
  }

  get atualizarTituloEdicao() {
    return this.convexame && this.convexame.descricaoconvenio;
  }
  confirmarExclusao() {
    this.confirmation.confirm({
      message: `Tem certeza que deseja excluir: <b>${this.exames.descricao}</b> ?`,
      accept: () => {
        this.excluir(this.idexame);
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
    this.examesService
      .excluir(id)
      .then(() => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Exame',
          detail: `${this.exames.descricao}, excluído com sucesso!`,
        });
        this.router.navigate(['/exames']);
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }
}

