import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { Convenios } from 'src/app/core/models/convenios.model';
import { Regex } from 'src/app/core/validators/regex';
import { ConveniosService } from '../convenios.service';

@Component({
  selector: 'app-convenio-cadastro',
  templateUrl: './convenio-cadastro.component.html',
  styleUrls: ['./convenio-cadastro.component.css']
})
export class ConvenioCadastroComponent implements OnInit {
  regex = new Regex();
  salvando: boolean = false;
  convenio = new Convenios();
  idConvenio: number;

  constructor(
    private convService: ConveniosService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private spinner: NgxSpinnerService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.title.setTitle('Cadastro Convênio');
    this.idConvenio = this.route.snapshot.params['id'];
    if (this.idConvenio) {
      this.spinner.show();
      this.carregarConvenio(this.idConvenio);
    } else {
      this.convenio.status = true;
    }
  }
  get editando(){
    return Boolean(this.convenio.id);
  }

  salvar(form: NgForm) {
    if(this.editando){
      this.atualizarConvenio(form);
    }else {
      this.adicionarConvenio(form);
    }
   }

  adicionarConvenio(form: NgForm){
    this.salvando = true;
    this.convService.adicionar(this.convenio)
    .then((obj) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Convênio',
        detail: `${obj.descricao}, adicionado com sucesso!`
      });
      this.salvando = false;
      this.router.navigate(['/convenios']);
    })
    .catch((erro) => {
      this.salvando = false;
       // this.erroHandler.handle(erro);
    })
  }

  atualizarConvenio(form: NgForm){
    this.salvando = true;
    this.convService.atualizar(this.convenio)
    .then((obj) => {
      this.messageService.add({
        severity: 'info',
        summary: 'Convênio',
        detail: `${obj.descricao}, atualizado com sucesso!`
      });
      this.atualizarTituloEdicao();
      this.salvando = false;
      this.router.navigate(['/convenios']);
    })
    .catch((erro) => {
      this.salvando = false;
       // this.erroHandler.handle(erro);
    })
  }

  carregarConvenio(id: number) {
    this.convService.buscarPorId(id)
      .then((obj) => {
        this.convenio = obj;
        this.atualizarTituloEdicao();
        this.spinner.hide();
      })
      .catch((erro) => {
        this.spinner.hide();
       // this.erroHandler.handle(erro);
      })
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Convênio: ${this.convenio.descricao}`);
  }



}
