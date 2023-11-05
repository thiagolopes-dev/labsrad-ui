import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ResetPass } from 'src/app/core/models/resetpass.model';
import { UsuariosService } from '../../usuarios/usuarios.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  logo: any = '/assets/images/unirad.png';
  daring: any = '/assets/images/logo-small-daring.png';
  forgot: any = new ResetPass();
  loading: boolean;


  constructor(
    private usuarioService: UsuariosService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  resetPass() {
    this.spinner.show();
    this.loading = true;
    this.usuarioService
      .atualizarSenha(this.forgot.email)
      .then(() => {
        this.spinner.hide();
        this.messageService.add({ severity: 'info', summary: 'Atenção', detail: 'senha enviada com sucesso!' });
        this.router.navigate(['/login']);
      })
      .catch((erro) => {
        this.errorHandler.handle(erro);
        this.spinner.hide();
        //  this.messageService.add({severity: 'error', summary: 'Atenção', detail: 'email inválido ou inexistente!'});
      });
  }
  EnterSubmit(event: any) {
    if (event.keyCode === 13) {
      this.resetPass();
    }
  }
}
