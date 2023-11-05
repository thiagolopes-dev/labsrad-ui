import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from './../../../environments/environment';

import * as moment from 'moment-timezone';
import { firstValueFrom } from 'rxjs';
import { Convenios } from 'src/app/core/models/convenios.model';

@Injectable()
export class ConveniosService {
  convUrl: string;

  constructor(private http: HttpClient) {
    this.convUrl = `${environment.apiUrl}/convenios`;
  }

  listarConvenios(): Promise<any> {
    return firstValueFrom(this.http.get(`${this.convUrl}`)).then(
      (response) => {
        const obj = response as any[];
        this.converterStringDate(obj);
        return obj;
      });
  }

  listarConveniosExame(id: number): Promise<any> {
    return firstValueFrom(this.http.get(`${this.convUrl}/conv/${id}`)).then(
      (response) => response
      );
  }

  excluir(id: number): Promise<void> {
    return firstValueFrom(this.http.delete(`${this.convUrl}/${id}`))
      .then()
      .then(() => null);
  }

  adicionar(convenio: Convenios): Promise<Convenios> {
    return firstValueFrom(this.http.post<Convenios>(this.convUrl, convenio));
  }

  atualizar(convenio: Convenios): Promise<Convenios> {
    return firstValueFrom(
      this.http.put(`${this.convUrl}/${convenio.id}`, convenio)
    ).then((response) => response as Convenios);
  }

  buscarPorId(id: number) {
    return firstValueFrom(this.http.get(`${this.convUrl}/${id}`)).then(
      (response) => response as Convenios
    );
  }

  mudarStatus(id: number, status: boolean): Promise<void> {
    const headers = new HttpHeaders().append(
      'Content-Type',
      'application/json'
    );
    return firstValueFrom(
      this.http.put(`${this.convUrl}/${id}/status`, status, { headers })
    ).then(() => null);
  }

  AlternarLista(valor: string): Promise<any> {
    return firstValueFrom(this.http.get(`${this.convUrl}${valor}`)).then(
      (response) => response
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
