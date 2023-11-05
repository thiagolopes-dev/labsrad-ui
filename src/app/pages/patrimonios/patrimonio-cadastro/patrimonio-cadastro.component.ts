import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  ConfirmEventType,
  ConfirmationService,
  MessageService,
} from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

import { Patrimonios } from 'src/app/core/models/patrimonios.model';
import { Regex } from 'src/app/core/validators/regex';
import { AuthService } from '../../seguranca/auth.service';
import { PatrimoniosService } from '../patrimonios.service';
import { EmpresasService } from './../../empresas/empresas.service';

@Component({
  selector: 'app-patrimonio-cadastro',
  templateUrl: './patrimonio-cadastro.component.html',
  styleUrls: ['./patrimonio-cadastro.component.css'],
})
export class PatrimonioCadastroComponent implements OnInit {
  messageDrop = 'Nenhum resultado encontrado...';
  regex = new Regex();
  patrimonio = new Patrimonios();
  idpatrimonio: number;
  salvando: boolean;
  empresas = [];

  constructor(
    private patrimonioService: PatrimoniosService,
    private empresaService: EmpresasService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private confirmation: ConfirmationService,
    public auth: AuthService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.patrimonio.status = true;
    this.idpatrimonio = this.route.snapshot.params['id'];
    this.title.setTitle('Cadastro de Patrimônio');

    this.carregarEmpresas();
    if (this.idpatrimonio) {
      this.spinner.show();
      this.carregarPatrimonio(this.idpatrimonio);
    } else {
      this.patrimonio.status = true;
    }
  }

  get editando() {
    return Boolean(this.patrimonio.id);
  }
  carregarEmpresas() {
    return this.empresaService
      .listar()
      .then((obj) => {
        this.empresas = obj.map((mp) => ({
          label: mp.razaosocial,
          value: mp.id,
        }));
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }
  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizarPatrimonio(form);
    } else {
      this.adicionarPatrimonio(form);
    }
  }
  adicionarPatrimonio(form: NgForm) {
    this.salvando = true;
    this.patrimonioService
      .adicionar(this.patrimonio)
      .then((obj) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Patrimônio',
          detail: `${obj.descricao}, adicionado com sucesso!`,
        });
        this.salvando = false;
        this.router.navigate(['/patrimonios']);
      })
      .catch((erro) => {
        this.salvando = false;
        this.errorHandler.handle(erro);
      });
  }
  atualizarPatrimonio(form: NgForm) {
    this.salvando = true;
    this.patrimonioService
      .atualizar(this.patrimonio)
      .then((obj) => {
        this.patrimonio = obj;
        this.messageService.add({
          severity: 'info',
          summary: 'Patrimônio',
          detail: `${obj.descricao}, alterado com sucesso!`,
        });
        this.atualizarTituloEdicao();
        this.salvando = false;
        this.router.navigate(['/patrimonios']);
      })
      .catch((erro) => {
        this.salvando = false;
        this.errorHandler.handle(erro);
      });
  }
  carregarPatrimonio(id: number) {
    this.patrimonioService
      .buscarPorId(id)
      .then((obj) => {
        this.patrimonio = obj;
        this.atualizarTituloEdicao();
        this.spinner.hide();
      })
      .catch((erro) => {
        this.spinner.hide();
        this.errorHandler.handle(erro);
      });
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Convênio: ${this.patrimonio.descricao}`);
  }

  confirmarExclusao() {
    this.confirmation.confirm({
      message: `Tem certeza que deseja excluir: <b>${this.patrimonio.descricao}</b> ?`,
      accept: () => {
        this.excluir(this.idpatrimonio);
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
    this.salvando = true;
    this.patrimonioService
      .excluir(id)
      .then(() => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Patrimônio',
          detail: `${this.patrimonio.descricao}, excluído com sucesso!`,
        });

        this.router.navigate(['/patrimonios']);
      })
      .catch((erro) => {
        this.salvando = false;
        this.errorHandler.handle(erro);
      });
  }
}
