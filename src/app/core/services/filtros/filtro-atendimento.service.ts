import { Injectable } from '@angular/core';
import { FiltrosAtendimentos } from '../../models/filtro.model';

@Injectable({
  providedIn: 'root'
})
export class FiltroAtendimentoService {

  constructor() { }

  async filtro(value: any, oldFiltro: FiltrosAtendimentos): Promise<FiltrosAtendimentos> {
    let filtro = new FiltrosAtendimentos();

    filtro = { ...oldFiltro };

    filtro.pagina = 0;
    filtro.itensPorPagina = 10;

    if (value.field === 'id') {
      filtro.id = value.qty;
    }
    if (value.field === 'idficha') {
      filtro.idficha = value.qty;
    }
    if (value.field === 'formapagamento') {
      filtro.formapagamento = value.qty;
    }
    if (value.field === 'nome') {
      filtro.nome = value.qty;
    }
    if (value.field === 'sexo') {
      filtro.sexo = value.qty;
    }
    if (value.field === 'status') {
      filtro.status = value.qty;
    }
    if (value.field === 'emailusuario') {
      filtro.emailusuario = value.qty;
    }
    return filtro;
  }

}
