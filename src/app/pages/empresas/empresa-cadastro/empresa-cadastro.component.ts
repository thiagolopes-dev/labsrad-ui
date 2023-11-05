import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Empresas } from 'src/app/core/models/empresas.model';
import { GovService } from 'src/app/core/services/gov.service';
import { ValidationService } from 'src/app/core/services/validations.service';
import { Regex } from 'src/app/core/validators/regex';
import { AuthService } from '../../seguranca/auth.service';
import { EmpresasService } from '../empresas.service';

@Component({
  selector: 'app-empresa-cadastro',
  templateUrl: './empresa-cadastro.component.html',
  styleUrls: ['./empresa-cadastro.component.css'],
})
export class EmpresaCadastroComponent implements OnInit {
  regex = new Regex();
  empresas = new Empresas();
  empresa: Empresas[];
  idCli: number;
  messageDrop = 'Nenhum resultado encontrado...';
  cidades = [];
  estados = [];
  cidadesFiltradas = [];
  salvando: boolean;

  naturezas = [
    { label: 'FÍSICA', value: 'FISICA' },
    { label: 'JURÍDICA', value: 'JURIDICA' },
  ];
  constructor(
    private title: Title,
    private empresaService: EmpresasService,
    private govService: GovService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    public auth: AuthService,
    private spinner: NgxSpinnerService,
    private validationService: ValidationService
  ) { }

  ngOnInit() {
    this.idCli = this.route.snapshot.params['id'];
    this.title.setTitle('Cadastro de Empresa');
    this.carregarEstados();
    this.carregarCidades();

    if (this.idCli) {
      this.spinner.show();
      setTimeout(() => {
        this.carregar(this.idCli);
      }, 1000);
    } else {
      this.empresas.status = true;
    }
  }

  get editando() {
    return Boolean(this.empresas.id);
  }
  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizar(form);
    } else {
      this.adicionar(form);
    }
  }
  adicionar(form: NgForm) {
    this.salvando = true;
    this.empresas.naturezapessoa = 'JURIDICA';
    this.empresaService
      .adicionar(this.empresas)
      .then((adicionado) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Empresa',
          detail: `adicionado com sucesso!`,
        });
        this.router.navigate(['/empresas']);
        this.salvando = false;
        form.reset();
      })
      .catch((erro) => {
        this.salvando = false;
        this.errorHandler.handle(erro);
      });
  }

  atualizar(form: NgForm) {
    this.salvando = true;
    this.empresas.naturezapessoa = 'JURIDICA';
    this.empresaService
      .atualizar(this.empresas)
      .then((empresa) => {
        this.empresas = empresa;
        this.messageService.add({
          severity: 'info',
          summary: 'Empresa',
          detail: `alterado com sucesso!`,
        });
        this.atualizarTituloEdicao();
        this.router.navigate(['/empresas']);
        this.salvando = false;
      })
      .catch((erro) => {
        this.salvando = false;
        this.errorHandler.handle(erro);
      });
  }

  carregar(id: number) {
    this.empresaService
      .buscarPorId(id)
      .then((empresas) => {
        this.empresas = empresas;
        const uf = { value: empresas.uf };
        this.validaEstado(uf, null);
        const cidade = this.validationService
          .removeAcento(empresas.cidade)
          .toUpperCase();
        setTimeout(() => {
          this.empresas.cidade = cidade;
          this.spinner.hide();
        }, 800);
        this.atualizarTituloEdicao();
      })
      .catch((erro) => {
        this.spinner.hide();
        this.errorHandler.handle(erro);
      });
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Empresa`);
  }

  // consultaCEP(cep, form) {
  //   // Nova variável "cep" somente com dígitos.
  //   cep = cep.replace(/\D/g, '');

  //   if (cep != null && cep !== '') {
  //     this.resetaCepForm(form);
  //     this.govService
  //       .consultaCEP(cep)
  //       .subscribe((dados) => this.populaCepForm(dados, form));
  //   }
  // }

  consultaCEP(cep, form) {
    this.spinner.show();
    cep = cep.replace(/\D/g, '');
    if (cep != null && cep !== '') {
      this.govService.consultaCEP(cep).subscribe({
        next: (dados) => {
          this.populaCepForm(dados, form);
        },
        error: (e) => {
          this.resetaCepForm(form);
          this.spinner.hide();
          this.messageService.add({
            severity: 'info',
            summary: 'Atenção',
            detail: `Erro ao buscar cep!`,
          });
        },
      });
    } else {
      this.spinner.hide();
    }
  }

  populaCepForm(dados, formulario) {
    formulario.form.patchValue({
      logradouro: dados.street.toUpperCase(),
      bairro: dados.neighborhood.toUpperCase(),
      cidade: dados.city.toUpperCase(),
      uf: dados.state.toUpperCase(),
    });
    const uf = { value: dados.state };
    this.validaEstado(uf, null);
    const cidade = this.validationService
      .removeAcento(dados.city)
      .toUpperCase();
    setTimeout(() => {
      this.empresas.cidade = cidade;
      this.spinner.hide();
    }, 80);
  }
  resetaCepForm(formulario) {
    formulario.form.patchValue({
      logradouro: null,
      bairro: null,
      numero: null,
      complemento: null,
      cidade: null,
      uf: null,
    });
  }

  consultaCNPJ(cnpj, form) {
    this.spinner.show();
    cnpj = cnpj.replace(/\D/g, '');
    if (cnpj != null && cnpj !== '' && cnpj.length >= 14) {
      this.govService.consultaCNPJ(cnpj).subscribe({
        next: (dados) => {
          this.populaCnpjForm(dados, form);
        },
        error: (e) => {
          this.resetaCnpjForm(cnpj, form);
          this.spinner.hide();
          this.messageService.add({
            severity: 'info',
            summary: 'Atenção',
            detail: `cnpj inválido ou erro ao buscar!`,
          });
        },
      });
    } else {
      this.spinner.hide();
    }
  }

  populaCnpjForm(dados, formulario) {
    if (dados.municipio === undefined || dados.municipio === null) {
    } else {
      this.empresas.cidade = dados.municipio;
      this.empresas.cidade = this.empresas.cidade.toUpperCase();
    }
    formulario.form.patchValue({
      razaosocial: dados.razaosocial,
      fantasia: dados.fantasia,
      naturezapessoa: dados.naturezapessoa,
      cep: dados.cep,
      logradouro: dados.logradouro,
      numero: dados.numero,
      bairro: dados.bairro,
      cidades: dados.municipio,
      telefonep: dados.telefone,
      emailAdm: dados.email,
      uf: dados.uf,
    });
    const uf = { value: dados.uf };
    this.validaEstado(uf, null);
    const cidade = this.validationService
      .removeAcento(dados.municipio)
      .toUpperCase();
    setTimeout(() => {
      this.empresas.cidade = cidade;
      this.spinner.hide();
    }, 80);
  }
  resetaCnpjForm(dados, formulario) {
    formulario.form.patchValue({
      razao: null,
      fantasia: null,
      cep: null,
      logradouro: null,
      numero: null,
      bairro: null,
      complemento: null,
      uf: null,
      cidade: null,
      nomecontato: null,
      telefone: null,
      whats: null,
      email: null,
      valor: null,
    });
  }
  carregarEstados() {
    this.govService.getUf().then((obj) => {
      this.estados = obj;
    });
  }

  carregarCidades() {
    this.govService.getCidades().then((obj) => {
      this.cidades = obj;
    });
  }

  validaEstado(uf: any, form: NgForm) {
    this.cidadesFiltradas = [];
    if (uf) {
      (async () => {
        await Promise.all(
          this.cidades.map(async (element) => {
            if (uf.value.uf === element.SIGLA || uf.value === element.SIGLA) {
              this.cidadesFiltradas.push({ ...element });
            }
          })
        );
      })();
    }
  }
}
