import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment-timezone';
import { firstValueFrom } from 'rxjs';
import { Patrimonios } from 'src/app/core/models/patrimonios.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PatrimoniosService {

  patrimonioUrl: string;
  constructor(private http: HttpClient) {
    this.patrimonioUrl = `${environment.apiUrl}/patrimonio`;
   }

  listar(): Promise<any> {
    return firstValueFrom(this.http.get(`${this.patrimonioUrl}`)).then(
      (response) => {
        const obj = response as any[];
        this.converterStringsParaDatas(obj);
        return obj;
      }
    );
  }
  AlternarLista(valor: string): Promise<any> {
    return firstValueFrom(
      this.http.get(`${this.patrimonioUrl}${valor}`)
    ).then((response) => response);
  }

  excluir(id: number): Promise<void> {
    return firstValueFrom(this.http.delete(`${this.patrimonioUrl}/${id}`))
      .then()
      .then(() => null);
  }

  adicionar(patrimonio: Patrimonios): Promise<Patrimonios> {
    return firstValueFrom(this.http.post<Patrimonios>(this.patrimonioUrl, patrimonio));
  }

  atualizar(patrimonio: Patrimonios): Promise<Patrimonios> {
    return firstValueFrom(
      this.http.put(`${this.patrimonioUrl}/${patrimonio.id}`, patrimonio)
    ).then((response) => response as Patrimonios);
  }

  buscarPorId(id: number) {
    return firstValueFrom(
      this.http.get(`${this.patrimonioUrl}/${id}`)
    )
      .then(response => {
        const patrimonio = response as Patrimonios;
        this.converterStringsParaDatas([patrimonio]);
        return patrimonio;
      });
  }

  private converterStringsParaDatas(obj: any[]) {
    obj.forEach((element) => {
      if (element.datagravacao) {
        element.datagravacao = moment(element.datagravacao, 'YYYY-MM-DD H:mm').tz('America/Sao_Paulo').toDate();
      }
      if (element.dataaquisicao) {
        element.dataaquisicao = moment(element.dataaquisicao, 'YYYY-MM-DD H:mm').tz('America/Sao_Paulo').toDate();
      }
    });
  }
}
