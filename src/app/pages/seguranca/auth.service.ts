import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MessageService } from 'primeng/api';

import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
  oauthTokenUrl: string;
  tokensRevokeUrl: string;
  jwtPayload: any;
  linkHttp: HttpClient;
  resetpass: string;
  empresaativaUrl: string;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private messageService: MessageService,
    private httpBackend: HttpBackend
  ) {
    this.carregarToken();
    this.oauthTokenUrl = `${environment.apiUrl}/oauth/token`;
    this.tokensRevokeUrl = `${environment.apiUrl}/tokens/revoke`;
    this.resetpass = `${environment.apiUrl}/d/forgot`;
    this.linkHttp = new HttpClient(this.httpBackend);
    this.empresaativaUrl = `${environment.apiUrl}/empresas/ativa`;
  }

  login(usuario: string, senha: string): Promise<void> {
    const headers = new HttpHeaders()
      .set('Authorization', 'Basic dW5pcmFkOiNTRVJWRVJAdW5pcmFkMjI=')
      .set('Content-Type', 'application/x-www-form-urlencoded');

    const body = `username=${usuario}&password=${senha}&grant_type=password`;
    // Primeira opção
    // return this.httpClient.post<any>(this.oauthTokenUrl, body, { headers })
    return firstValueFrom(
      this.http.post(this.oauthTokenUrl, body, {
        headers,
        withCredentials: true,
      })
    )
      .then((response) => {
        // segunda opção
        this.armazenarToken(response['access_token'], response);
        this.messageService.add({
          severity: 'success',
          summary: 'Login',
          detail: 'Efetuado com sucesso',
        });
      })
      .catch((response) => {
        const responseError = response.error;
        if (response.status === 400) {
          if (responseError.error === 'invalid_grant') {
            return Promise.reject('Usuário ou senha inválido');
          }
        }
        return Promise.reject(response);
      });
  }

  logout() {
    return firstValueFrom(
      this.http.delete(this.tokensRevokeUrl, { withCredentials: true })
    ).then(() => {
      this.limparAccessToken();
      this.messageService.add({
        severity: 'success',
        summary: 'Saindo',
        detail: 'até breve...',
      });
    });
  }

  limparAccessToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('name_user');
    this.jwtPayload = null;
  }

  isAccessTokenInvalido() {
    const token = localStorage.getItem('token');
    return !token || this.jwtHelper.isTokenExpired(token);
  }

  temPermissao(permissao: string) {
    const token = localStorage.getItem('token');
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  private armazenarToken(token: string, response: any) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    if (response?.nome) {
      this.jwtPayload.nome = response.nome;
      localStorage.setItem('name_user', response.nome);
    }
    localStorage.setItem('token', token);
  }

  buscarEmpAtiva() {
    return firstValueFrom(this.http.get(`${this.empresaativaUrl}`)).then(
      (response) => response
    );
  }

  regrasdePermissao(roles) {
    for (const role of roles) {
      if (this.temPermissao(role)) {
        return true;
      }
    }
    return false;
  }

  obterNovoAccessToken(): Promise<void> {
    const headers = new HttpHeaders()
      .set('Authorization', 'Basic dW5pcmFkOiNTRVJWRVJAdW5pcmFkMjI=')
      .set('Content-Type', 'application/x-www-form-urlencoded');

    const body = 'grant_type=refresh_token';

    return firstValueFrom(
      this.http.post(this.oauthTokenUrl, body, {
        headers,
        withCredentials: true,
      })
    )
      .then((response) => {
        // tslint:disable-next-line: no-string-literal
        this.armazenarToken(response['access_token'], response);
        return Promise.resolve(null);
      })
      .catch((response) => {
        // console.error('Erro ao renovar token', response);
      });
  }

  private carregarToken() {
    const token = localStorage.getItem('token');
    let response = null;
    if (localStorage.getItem('name_user')) {
      response = { nome: localStorage.getItem('name_user') };
    }
    if (token) {
      this.armazenarToken(token, response ? response : null);
    }
  }

  atualizarSenha(pass: string): Promise<any> {
    return firstValueFrom(this.linkHttp.put(`${this.resetpass}`, pass)).then(
      (response) => response as any
    );
  }
}
