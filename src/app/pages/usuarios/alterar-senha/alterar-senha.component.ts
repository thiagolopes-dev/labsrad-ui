import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Usuarios } from 'src/app/core/models/usuarios.model';
import { UsuariosService } from '../usuarios.service';


@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.component.html',
  styleUrls: ['./alterar-senha.component.css'],
})
export class AlterarSenhaComponent implements OnInit {
  usuario = new Usuarios();
  usuarios = [];
  idUser: number;
  salvando: boolean;

  constructor(
    private usuarioService: UsuariosService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,

    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) {}

  ngOnInit() {
    this.idUser = this.route.snapshot.params['id'];
    this.title.setTitle('Alterar Senha Usuário');
    if (this.idUser) {
      this.carregarUsuario(this.idUser);
    }
  }
  carregarUsuario(id: number) {
    this.usuarioService
      .buscarPorIdSenha(id)
      .then((pac) => {
        this.usuario = pac;
        this.atualizarTituloEdicao();
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }
  alterarSenha(form: NgForm) {
    this.salvando = true;
    this.usuarioService
      .alterarSenha(this.usuario)
      .then((usuario) => {
        this.usuario = usuario;
        this.messageService.add({
          severity: 'info',
          summary: 'Senha',
          detail: `${usuario.nome}, alterado com sucesso!`,
        });
        this.atualizarTituloEdicao();
        this.salvando = true;
        this.router.navigate(['/usuarios']);
      })
      .catch((erro) => {
        this.salvando = false;
        this.errorHandler.handle(erro);
      });
  }
  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Usuário: ${this.usuario.nome}`);
  }
}
