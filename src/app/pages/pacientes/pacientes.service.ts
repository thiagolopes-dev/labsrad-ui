import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from './../../../environments/environment';

import * as moment from 'moment-timezone';
import { firstValueFrom } from 'rxjs';
import { FiltrosPacientes } from 'src/app/core/models/filtro.model';
import { Pacientes } from 'src/app/core/models/pacientes.model';

@Injectable()
export class PacientesService {
  pacienteUrl: string;

  constructor(private http: HttpClient) {
    this.pacienteUrl = `${environment.apiUrl}/pacientes`;
  }

  listarPacientes(): Promise<any> {
    return firstValueFrom(this.http.get(`${this.pacienteUrl}`)).then(
      (response) => {
        const obj = response as any[];
        this.converterStringDate(obj);
        return obj;
      }
    );
  }

  listarComFiltro(filtro: FiltrosPacientes): Promise<any> {
    const param: { [k: string]: any } = this.validarParametros(filtro);
    return firstValueFrom(this.http.get(`${this.pacienteUrl}/filtro`, { params: param })).then(
      (response: any) => {
        this.converterStringsParaDatasFiltro(response.content);
        return response;
      }
    );
  }

  validarParametros(filtro: FiltrosPacientes) {
    const obj: { [k: string]: any } = {};

    obj.page = filtro.pagina;
    obj.size = filtro.itensPorPagina;

    if (filtro.id) {
      obj.id = filtro.id;
    }

    if (filtro.cpf) {
      obj.cpf = filtro.cpf;
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

    if (filtro.emailusuario) {
      obj.emailusuario = filtro.emailusuario;
    }

    if (filtro.datagravacaode) {
      obj.datagravacaode = filtro.datagravacaode;
    }

    if (filtro.datagravacaoate) {
      obj.datagravacaoate = filtro.datagravacaoate;
    }

    if (filtro.status) {
      obj.status = filtro.status;
    }

    return obj;
  }

  excluir(id: number): Promise<void> {
    return firstValueFrom(this.http.delete(`${this.pacienteUrl}/${id}`))
      .then()
      .then(() => null);
  }

  adicionar(paciente: Pacientes): Promise<Pacientes> {
    return firstValueFrom(
      this.http.post<Pacientes>(this.pacienteUrl, paciente)
    );
  }

  atualizar(paciente: Pacientes): Promise<Pacientes> {
    return firstValueFrom(
      this.http.put(`${this.pacienteUrl}/${paciente.id}`, paciente)
    ).then((response) => {
      const pacAlterado = response as Pacientes;
      this.converterStringsParaDatas([pacAlterado]);
      return pacAlterado;
    });
  }
  private converterStringsParaDatas(pacientes: Pacientes[]) {
    for (const paciente of pacientes) {
      if (paciente.datanasc === null) {
      } else {
        paciente.datanasc = moment(paciente.datanasc, 'YYYY-MM-DD').toDate();
      }
    }
  }
  buscarPorId(id: number) {
    return firstValueFrom(this.http.get(`${this.pacienteUrl}/${id}`)).then(
      (response) => {
        const paciente = response as Pacientes;
        this.converterStringsParaDatas([paciente]);
        return paciente;
      }
    );
  }

  AlternarLista(valor: string): Promise<any> {
    return firstValueFrom(this.http.get(`${this.pacienteUrl}${valor}`)).then(
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

}
