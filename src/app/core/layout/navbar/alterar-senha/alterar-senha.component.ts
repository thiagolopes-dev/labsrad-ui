import { Router } from '@angular/router';
import { ErrorHandlerService } from './../../../error-handler.service';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Usuarios } from 'src/app/core/models/usuarios.model';
import { UsuariosService } from 'src/app/pages/usuarios/usuarios.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.component.html',
  styleUrls: ['./alterar-senha.component.css'],
})
export class AlterarSenhaComponent implements OnInit {
  usuario = new Usuarios();
  salvando: boolean;

  constructor(
    private usuarioService: UsuariosService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) {}

  ngOnInit() {}

  alterarSenha(form: NgForm) {
    this.salvando = true;
    this.usuarioService
      .alterarSenhaUsuario(this.usuario.senha)
      .then((usuario) => {
        this.usuario = usuario;
        this.salvando = false;
        this.messageService.add({
          severity: 'info',
          summary: 'Senha',
          detail: `${usuario.nome}, alterado com sucesso!`,
        });
        this.router.navigate(['/dashboard']);
      })
      .catch((erro) => {
        this.salvando = false;
        this.errorHandler.handle(erro);
      });
  }
}
