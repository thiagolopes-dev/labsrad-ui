import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as moment from 'moment';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class RelatoriosService {
  atendimentosUrl: string;

  constructor(private http: HttpClient) {
    this.atendimentosUrl = `${environment.apiUrl}/atendimentos`;
  }

  relatorioAtendimentoFiltro(inicio: Date, fim: Date) {
    let params = new HttpParams();
    params = params.set('inicio', moment(inicio).format('YYYY-MM-DD'));
    params = params.set('fim', moment(fim).format('YYYY-MM-DD'));
    return firstValueFrom(
      this.http.get(`${this.atendimentosUrl}/relatorios/atendimentoFiltro`, {
        params,
        responseType: 'blob',
      })
    ).then((response) => response);
  }
  relatorioMensalUsuario(mes: string, ano: string, usuario: string) {
    let params = new HttpParams();
    params = params.set('mes', mes);
    params = params.set('ano', ano);
    params = params.set('usuario', usuario);
    return firstValueFrom(
      this.http.get(`${this.atendimentosUrl}/relatorios/mensalUsuario`, {
        params,
        responseType: 'blob',
      })
    ).then((response) => response);
  }
  
  relatorioMensal(mes: string, ano: string) {
    let params = new HttpParams();
    params = params.set('mes', mes);
    params = params.set('ano', ano);
    return firstValueFrom(
      this.http.get(`${this.atendimentosUrl}/relatorios/mensal`, {
        params,
        responseType: 'blob',
      })
    ).then((response) => response);
  }
  relatorioMensalConvenio(mes: string, ano: string, convenio: string) {
    let params = new HttpParams();
    params = params.set('mes', mes);
    params = params.set('ano', ano);
    params = params.set('convenio', convenio);
    return firstValueFrom(
      this.http.get(`${this.atendimentosUrl}/relatorios/mensalconvenio`, {
        params,
        responseType: 'blob',
      })
    ).then((response) => response);
  }
  relatorioUsuarios() {
    return firstValueFrom(
      this.http.get(`${this.atendimentosUrl}/relatorios/usuarios`, {
        responseType: 'blob',
      })
    ).then((response) => response);
  }
  relatorioConvenios() {
    return firstValueFrom(
      this.http.get(`${this.atendimentosUrl}/relatorios/convenios`, {
        responseType: 'blob',
      })
    ).then((response) => response);
  }
  relatorioExames() {
    return firstValueFrom(
      this.http.get(`${this.atendimentosUrl}/relatorios/exames`, {
        responseType: 'blob',
      })
    ).then((response) => response);
  }
  atendimento(atendimento: string) {
    let params = new HttpParams();
    params = params.set('atendimento', atendimento);
    return firstValueFrom(
      this.http.get(`${this.atendimentosUrl}/atendimento/ficha`, {
        params,
        responseType: 'blob',
      })
    ).then((response) => response);
  }
}
