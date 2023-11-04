import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment-timezone';
import { firstValueFrom } from 'rxjs';
import { Convenios } from 'src/app/core/models/convenios.model';

@Injectable({
  providedIn: 'root',
})
export class ConveniosService {
  convenioUrl: string;

  constructor(private http: HttpClient) {
    // this.convenioUrl = `${environment.apiUrl}/convenios`;
    this.convenioUrl = 'https://65340b75e1b6f4c59046859c.mockapi.io/convenios';
  }

  async listarConvenios(): Promise<any> {
    const response = await firstValueFrom(this.http.get(`${this.convenioUrl}`));
    const obj = response as any[];
   // this.converterStringParaData(obj);
    return obj;
  }

  async listarExames(id: number): Promise<any> {
    const response = await firstValueFrom(this.http.get(`${this.convenioUrl}/conv/${id}`));
    return response;
  }

 async adicionar(convenio: Convenios): Promise<Convenios> {
   const response = await  firstValueFrom(
      this.http.post<Convenios>(this.convenioUrl, convenio)
    );
    return convenio;
  }

  async atualizar(convenio: Convenios): Promise<Convenios> {
    const response = await firstValueFrom(
      this.http.put<Convenios>(`${this.convenioUrl}/${convenio.id}`, convenio)
    );
    return response as Convenios;
  }

  async buscarPorId(id: number): Promise<Convenios>{
    const response = await firstValueFrom(
      this.http.get(`${this.convenioUrl}/${id}`));
    return response as Convenios;
  }

  async mudarStatus(id: number, status: boolean){
    const headers = new HttpHeaders().append(
      'Content-Type',
      'application/json'
    );
    await firstValueFrom(
      this.http.put(`${this.convenioUrl}/${id}/status`, status, { headers })
    );
    return null;
  }

  async AlternarLista(valor: string): Promise<any>{
   const response = await firstValueFrom(
      this.http.get(`${this.convenioUrl}${valor}`)
    );
    return response;
  }

  converterStringParaData(obj: any[]) {
    obj.forEach((element) => {
      element.datagravacao = moment(element.datagravacao, 'YYYY/MM/DD H:mm')
        .tz('America/Sao_Paulo')
        .toDate();
    });
  }
}
