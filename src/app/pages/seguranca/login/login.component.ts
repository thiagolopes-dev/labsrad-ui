import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';
import { Message } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  background: any = '/assets/images/background.jpg';
  logo: any = '/assets/images/labsrad.png';
  deviceInfo = null;
  dialogiOS: boolean;
  position: string;
  messages: Message[] | undefined;

  constructor(
    private auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private title: Title,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.title.setTitle('Login');
  }


  login(usuario: string, senha: string) {
    this.spinner.show();
    this.auth
      .login(usuario, senha)
      .then(() => {
        this.router.navigate(['/']);
        this.spinner.hide();
      })
      .catch((erro) => {
        this.addMessages(erro);
        setTimeout(() => {
          this.clearMessages()
        }, 2060);

        this.spinner.hide();
        this.errorHandler.handle(erro);
      });
  }


  addMessages(msg: string) {
    this.messages = [
      { severity: 'error', detail: `${msg}` }
    ];
  }

  clearMessages() {
    this.messages = [];
  }

  EnterSubmit(event: any, form: NgForm, usuario: string, senha: string) {
    if (event.keyCode === 13) {
      this.login(usuario, senha);
    }
  }
}
