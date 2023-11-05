import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { firstValueFrom, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GovService {

  cnpjUrl: string;
  estadosUrl: string;
  cidadesUrl: string;

  constructor(private http: HttpClient) {
    this.cnpjUrl = `${environment.apiUrl}/cnpj`;
  }

  consultaCNPJ(cnpj: string) {
    // Nova variável "cnpj" somente com dígitos.
    cnpj = cnpj.replace(/\D/g, '');
    // Verifica se campo cnpj possui valor informado.
    if (cnpj !== '') {
      // Expressão regular para validar o CNPJ.
      const validacnpj = /^[0-9]{14}$/;
      // Valida o formato do CNPJ.
      if (validacnpj.test(cnpj)) {
    return this.http.get(`${this.cnpjUrl}/${cnpj}`);
  }
}
    return of({});
  }

  consultaCEP(cep: string) {
    // Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');
    // Verifica se campo cep possui valor informado.
    if (cep !== '') {
      // Expressão regular para validar o CEP.
      const validacep = /^[0-9]{8}$/;
      // Valida o formato do CEP.
      if (validacep.test(cep)) {
        return this.http.get(`https://brasilapi.com.br/api/cep/v2/${cep}`);
      }
    }
    return of({});
  }

  getCidades() {
    return firstValueFrom(this.http.get<any>('assets/dados/cidades.json'))
      .then(res => res.data as any[])
  }

  getUf() {
    return firstValueFrom(this.http.get<any>('assets/dados/uf.json'))
      .then((res) => res.uf as any[])
  }
}
