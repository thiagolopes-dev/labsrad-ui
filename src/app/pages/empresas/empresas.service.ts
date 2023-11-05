import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from './../../../environments/environment';
import * as moment from 'moment-timezone';
import { Empresas } from 'src/app/core/models/empresas.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmpresasService {
  empresaUrl: string;

  constructor(private http: HttpClient) {
    this.empresaUrl = `${environment.apiUrl}/empresas`;
  }

  listar(): Promise<any> {
    return firstValueFrom(this.http.get(`${this.empresaUrl}`)).then(
      (response) => {
        const obj = response as any[];
        this.converterStringDate(obj);
        return obj;
      }
    );
  }

  listarEmpresas(): Promise<any> {
    return firstValueFrom(
      this.http.get(`${this.empresaUrl}`)
    )
      .then(response => {
        const obj = response as any[];
        this.converterStringDate(obj);
        return obj;
      });
  }

  listarEmpresasUsuario(): Promise<any> {
    return firstValueFrom(this.http.get(`${this.empresaUrl}/usuario`)).then(
      (response) => response
    );
  }

  adicionar(obj: Empresas): Promise<Empresas> {
    return firstValueFrom(this.http.post<Empresas>(this.empresaUrl, obj));
  }

  atualizar(obj: Empresas): Promise<Empresas> {
    return firstValueFrom(
      this.http.put(`${this.empresaUrl}/${obj.id}`, obj)
    ).then((response) => response as Empresas);
  }

  buscarPorId(id: number) {
    return firstValueFrom(this.http.get(`${this.empresaUrl}/${id}`)).then(
      (response) => response as Empresas
    );
  }

  AlternarLista(valor: string): Promise<any> {
    return firstValueFrom(this.http.get(`${this.empresaUrl}${valor}`)).then(
      (response) => response
    );
  }
  // TODO Metodo para converter Datas e filtros
  converterStringDate(obj: any[]) {
    obj.forEach((element) => {
      element.datagravacao = moment(element.datagravacao, 'YYYY/MM/DD H:mm')
        .tz('America/Sao_Paulo')
        .toDate();
    });
  }
}
