import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as moment from 'moment-timezone';
import { firstValueFrom } from 'rxjs';
import { Usuarios } from 'src/app/core/models/usuarios.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class UsuariosService {
  usuariosUrl: string;
  tenantUrl: string;
  permissoesUrl: string;
  resetpass: string;

  constructor(private http: HttpClient) {
    this.usuariosUrl = `${environment.apiUrl}/usuarios`;
    this.permissoesUrl = `${environment.apiUrl}/permissoes`;
    this.resetpass = `${environment.apiUrl}/forgot`;
  }

  listarTenant(): Promise<any> {
    return firstValueFrom(this.http.get(`${this.tenantUrl}`)).then(
      (response) => response
    );
  }
  listarPermissoes(id: number): Promise<any> {
    return firstValueFrom(this.http.get(`${this.permissoesUrl}/${id}`)).then(
      (response) => response
    );
  }

  listarUsuarios(): Promise<any> {
    return firstValueFrom(this.http.get(`${this.usuariosUrl}`)).then(
      (response) => {
        const obj = response as any[];
        this.converterStringDate(obj);
        return obj;
      }
    );
  }

  excluir(id: number): Promise<void> {
    return firstValueFrom(this.http.delete(`${this.usuariosUrl}/${id}`))
      .then()
      .then(() => null);
  }

  adicionar(user: Usuarios): Promise<Usuarios> {
    return firstValueFrom(this.http.post<Usuarios>(this.usuariosUrl, user));
  }

  atualizar(user: Usuarios): Promise<Usuarios> {
    return firstValueFrom(
      this.http.put(`${this.usuariosUrl}/${user.id}`, user)
    ).then((response) => response as Usuarios);
  }
  alterarSenha(user: Usuarios): Promise<Usuarios> {
    return firstValueFrom(
      this.http.put(`${this.usuariosUrl}/${user.id}/senha`, user)
    ).then((response) => response as Usuarios);
  }
  alterarSenhaUsuario(senha: string): Promise<Usuarios> {
    return firstValueFrom(
      this.http.put(`${this.usuariosUrl}/alterarsenha`, senha)
    ).then((response) => response as Usuarios);
  }
  buscarPorIdSenha(id: number) {
    return firstValueFrom(
      this.http.get(`${this.usuariosUrl}/${id}/senha`)
    ).then((response) => response as Usuarios);
  }

  buscarPorId(id: number) {
    return firstValueFrom(this.http.get(`${this.usuariosUrl}/${id}`)).then(
      (response) => response as Usuarios
    );
  }

  mudarStatus(id: number, status: boolean): Promise<void> {
    const headers = new HttpHeaders().append(
      'Content-Type',
      'application/json'
    );
    return firstValueFrom(
      this.http.put(`${this.usuariosUrl}/${id}/status`, status, { headers })
    ).then(() => null);
  }

  AlternarLista(valor: string): Promise<any> {
    return firstValueFrom(this.http.get(`${this.usuariosUrl}${valor}`)).then(
      (response) => response
    );
  }

  atualizarSenha(pass: string): Promise<any> {
    return firstValueFrom(this.http.put(`${this.resetpass}`, pass)).then(
      (response) => response as any
    );
  }

  empresaUsuario(id: number): Promise<any> {
    return firstValueFrom(
      this.http.put(`${this.usuariosUrl}/tenant/${id}`, id)
    ).then((response) => response);
  }
  converterStringDate(obj: any[]) {
    obj.forEach((element) => {
      element.datagravacao = moment(element.datagravacao, 'YYYY/MM/DD H:mm')
        .tz('America/Sao_Paulo')
        .toDate();
    });
  }
}
