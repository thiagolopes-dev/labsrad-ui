import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FiltrosAtendimentos } from './../../core/models/filtro.model';

import { environment } from './../../../environments/environment';

import * as moment from 'moment-timezone';
import { firstValueFrom } from 'rxjs';
import { Atendimentos } from 'src/app/core/models/atendimentos.model';
import { Convenios } from 'src/app/core/models/convenios.model';
import { ItensAtendimentos } from 'src/app/core/models/itensAtendimentos.model';
import { Exames } from './../../core/models/exames.model';

@Injectable()
export class AtendimentosService {
  atendUrl: string;
  examesUrl: string;

  constructor(private http: HttpClient) {
    this.atendUrl = `${environment.apiUrl}/atendimentos`;
    this.examesUrl = `${environment.apiUrl}/examesconv`;
  }
  listarItensAtend(id: number): Promise<any> {
    return firstValueFrom(this.http.get(`${this.atendUrl}/itens/${id}`)).then(
      (response) => {
        const obj = response as any[];
        this.converterStringDate(obj);
        return obj;
      }
    );
  }
  buscarExames(idconvenio: number): Promise<Exames> {
    return firstValueFrom(
      this.http.get(`${this.examesUrl}/${idconvenio}`)
    ).then((response) => response as Exames);
  }

  buscarValores(
    idexame: number,
    idconvenio: number
  ): Promise<ItensAtendimentos> {
    return firstValueFrom(
      this.http.get(`${this.examesUrl}/${idexame}/${idconvenio}`)
    ).then((response) => response as ItensAtendimentos);
  }

  selecionarExame(idexame: number): Promise<Convenios> {
    return firstValueFrom(this.http.get(`${this.examesUrl}/${idexame}`)).then(
      (response) => response as Convenios
    );
  }

  listarAtendimentos(): Promise<any> {
    return firstValueFrom(this.http.get(`${this.atendUrl}`)).then(
      (response) => response
    );
  }

  listarComFiltro(filtro: FiltrosAtendimentos): Promise<any> {
    const param: { [k: string]: any } = this.validarParametros(filtro);
    return firstValueFrom(this.http.get(`${this.atendUrl}`, { params: param })).then(
      (response: any) => {
        this.converterStringsParaDatasFiltro(response.content);
        return response;
      }
    );
  }

  private converterStringsParaDatasFiltro(obj: any[]) {
    obj.forEach((element) => {
      if (element.datanasc) {
        element.datanasc = moment(element.datanasc, 'YYYY-MM-DD H:mm')
          .tz('America/Sao_Paulo')
          .toDate();
      }
      if (element.datagravacao) {
        element.datagravacao = moment(element.datagravacao, 'YYYY-MM-DD H:mm')
          .tz('America/Sao_Paulo')
          .toDate();
      }
    });
  }


  validarParametros(filtro: FiltrosAtendimentos) {
    const obj: { [k: string]: any } = {};

    obj.page = filtro.pagina;
    obj.size = filtro.itensPorPagina;

    if (filtro.id) {
      obj.id = filtro.id;
    }

    if (filtro.idficha) {
      obj.idficha = filtro.idficha;
    }

    if (filtro.nome) {
      obj.nome = filtro.nome;
    }

    if (filtro.datanascde) {
      obj.datanascde = filtro.datanascde;
    }

    if (filtro.datanascate) {
      obj.datanascate = filtro.datanascate;
    }

    if (filtro.sexo) {
      obj.sexo = filtro.sexo;
    }

    if (filtro.formapagamento) {
      obj.formapagamento = filtro.formapagamento;
    }

    if (filtro.emailusuario) {
      obj.emailusuario = filtro.emailusuario;
    }

    if (filtro.datalancamentode) {
      obj.datalancamentode = filtro.datalancamentode;
    }

    if (filtro.datalancamentoate) {
      obj.datalancamentoate = filtro.datalancamentoate;
    }

    if (filtro.status) {
      obj.status = filtro.status;
    }

    return obj;
  }

  excluir(id: number): Promise<void> {
    return firstValueFrom(this.http.delete(`${this.atendUrl}/${id}`))
      .then()
      .then(() => null);
  }

  adicionar(atendimento: Atendimentos): Promise<Atendimentos> {
    return firstValueFrom(
      this.http.post<Atendimentos>(this.atendUrl, atendimento)
    );
  }

  atualizar(atendimento: Atendimentos): Promise<Atendimentos> {
    return firstValueFrom(
      this.http.put(`${this.atendUrl}/${atendimento.id}`, atendimento)
    ).then((response) => response as Atendimentos);
  }

  buscarPorId(id: number) {
    return firstValueFrom(this.http.get(`${this.atendUrl}/${id}`)).then(
      (response) => response as any
    );
  }

  mudarStatus(id: number, status: boolean): Promise<void> {
    const headers = new HttpHeaders().append(
      'Content-Type',
      'application/json'
    );
    return firstValueFrom(
      this.http.put(`${this.atendUrl}/${id}/status`, status, { headers })
    ).then(() => null);
  }

  AlternarLista(valor: string): Promise<any> {
    return firstValueFrom(this.http.get(`${this.atendUrl}${valor}`)).then(
      (response) => response
    );
  }
  listarExames(exame): Promise<Exames[]> {
    let params = new HttpParams();
    params = params.set('exame', exame);
    return firstValueFrom(this.http.get(this.examesUrl, { params })).then(
      (response) => response as Exames[]
    );
  }
  converterStringDate(obj: any[]) {
    obj.forEach((element) => {
      element.datagravacao = moment(element.datagravacao, 'YYYY/MM/DD H:mm')
        .tz('America/Sao_Paulo')
        .toDate();
    });
  }
}
