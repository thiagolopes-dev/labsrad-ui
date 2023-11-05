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
import { Pacientes } from 'src/app/core/models/pacientes.model';
import { Regex } from 'src/app/core/validators/regex';
import { AuthService } from '../../seguranca/auth.service';
import { PacientesService } from './../pacientes.service';

@Component({
  selector: 'app-paciente-cadastro',
  templateUrl: './paciente-cadastro.component.html',
  styleUrls: ['./paciente-cadastro.component.css'],
})
export class PacienteCadastroComponent implements OnInit {

  regex = new Regex();
  traducao: any;
  pacientes = new Pacientes();
  idPac: number;
  disabledExcluir: boolean;
  salvando: boolean;
  messageDrop = 'Nenhum resultado encontrado...';


  sexos = [
    { label: 'MASCULINO', value: 'MASCULINO' },
    { label: 'FEMININO', value: 'FEMININO' },
    { label: 'OUTROS', value: 'OUTROS' },
  ];

  constructor(
    private pacService: PacientesService,
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
    this.pacientes.status = true;
    this.idPac = this.route.snapshot.params['id'];
    this.title.setTitle('Cadastro de Paciente');

    if (this.idPac) {
      this.spinner.show();
      this.carregarPaciente(this.idPac);
    } else {
      this.pacientes.status = true;
    }
  }

  get editando() {
    return Boolean(this.pacientes.id);
  }
  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizarPaciente(form);
    } else {
      this.adicionarPaciente(form);
    }
  }
  adicionarPaciente(form: NgForm) {
    this.salvando = true;
    this.pacService
      .adicionar(this.pacientes)
      .then((pacAdicionado) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Paciente',
          detail: `${pacAdicionado.nome}, adicionado com sucesso!`,
        });
        this.salvando = false;
        this.router.navigate(['/pacientes']);
      })
      .catch((erro) => {
        this.salvando = false;
        this.errorHandler.handle(erro);
      });
  }
  atualizarPaciente(form: NgForm) {
    this.salvando = true;
    this.pacService
      .atualizar(this.pacientes)
      .then((pac) => {
        this.pacientes = pac;
        this.messageService.add({
          severity: 'info',
          summary: 'Pacientes',
          detail: `${pac.nome}, alterado com sucesso!`,
        });
        this.salvando = false;
        this.atualizarTituloEdicao();
        this.router.navigate(['/pacientes']);
      })
      .catch((erro) => {
        this.salvando = false;
        this.errorHandler.handle(erro);
      });
  }
  carregarPaciente(id: number) {
    this.pacService
      .buscarPorId(id)
      .then((pac) => {
        this.pacientes = pac;
        this.atualizarTituloEdicao();
        this.spinner.hide();
      })
      .catch((erro) => {
        this.spinner.hide();
        this.errorHandler.handle(erro);
      });
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Paciente: ${this.pacientes.nome}`);
  }
  confirmarExclusao() {
    this.confirmation.confirm({
      message: `Tem certeza que deseja excluir: <b>${this.pacientes.nome}</b> ?`,
      accept: () => {
        this.excluir(this.idPac);
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
    this.pacService
      .excluir(id)
      .then(() => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Paciente',
          detail: `${this.pacientes.nome}, excluído com sucesso!`,
        });
        this.router.navigate(['/pacientes']);
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }
}
