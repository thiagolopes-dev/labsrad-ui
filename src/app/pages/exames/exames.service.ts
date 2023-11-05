import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from './../../../environments/environment';

import { Exames } from 'src/app/core/models/exames.model';
import { Convenios } from 'src/app/core/models/convenios.model';
import { firstValueFrom } from 'rxjs';
import * as moment from 'moment-timezone';

@Injectable()
export class ExamesService {
  examesUrl: string;
  convenioUrl: string;
  exameconvenioUrl: string;

  constructor(private http: HttpClient) {
    this.examesUrl = `${environment.apiUrl}/exames`;
    this.convenioUrl = `${environment.apiUrl}/convenios`;
    this.exameconvenioUrl = `${environment.apiUrl}/examesconv`;
  }

  listarExamesC(idconvenio: number): Promise<any> {
    return firstValueFrom(
      this.http.get(`${this.exameconvenioUrl}/${idconvenio}`)
    ).then((response) => {
      const obj = response as any[];
      this.converterStringDate(obj);
      return obj;
    });
  }
  listarExames(): Promise<any> {
    return firstValueFrom(this.http.get(`${this.examesUrl}`)).then(
      (response) => {
        const obj = response as any[];
        this.converterStringDate(obj);
        return obj;
      }
    );
  }
  listarExamesConvenios(id: number): Promise<any> {
    return firstValueFrom(this.http.get(`${this.convenioUrl}/exame/${id}`)).then(
      (response) => {
        const obj = response as any[];
        this.converterStringDate(obj);
        return obj;
      }
    );
  }

  excluir(id: number): Promise<void> {
    return firstValueFrom(this.http.delete(`${this.examesUrl}/${id}`))
      .then()
      .then(() => null);
  }

  adicionar(exame: Exames): Promise<Exames> {
    return firstValueFrom(this.http.post<Exames>(this.examesUrl, exame));
  }

  atualizar(exame: Exames): Promise<Exames> {
    return firstValueFrom(
      this.http.put(`${this.examesUrl}/${exame.id}`, exame)
    ).then((response) => response as Exames);
  }

  buscarPorId(id: number) {
    return firstValueFrom(this.http.get(`${this.examesUrl}/${id}`)).then(
      (response) => response as Exames
    );
  }

  mudarStatus(id: number, status: boolean): Promise<void> {
    const headers = new HttpHeaders().append(
      'Content-Type',
      'application/json'
    );
    return firstValueFrom(
      this.http.put(`${this.examesUrl}/${id}/status`, status, { headers })
    ).then(() => null);
  }

  AlternarLista(valor: string): Promise<any> {
    return firstValueFrom(this.http.get(`${this.examesUrl}${valor}`)).then(
      (response) => response
    );
  }
  buscarDescricaoConvenio(id: number) {
    return firstValueFrom(this.http.get(`${this.convenioUrl}/${id}`)).then(
      (response) => response as Convenios
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
