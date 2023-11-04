import { Injectable } from '@angular/core';
import { FiltrosPacientes } from '../../models/filtro.model';

@Injectable({
  providedIn: 'root'
})
export class FiltroPacienteService {

constructor() { }

async filtro(value: any, oldFiltro: FiltrosPacientes):Promise<FiltrosPacientes>{
  let filtro = new FiltrosPacientes();

  filtro = {... oldFiltro};

  filtro.pagina = 0;
  filtro.itensPorPagina = 10;

  if(value.field === 'id'){
    filtro.id = value.qty;
  }

  if(value.field === 'cpf'){
    filtro.cpf = value.qty;
  }

  if(value.field === 'nome'){
    filtro.nome = value.qty;
  }

  if(value.field === 'sexo'){
    filtro.sexo = value.qty;
  }

  if(value.field === 'status'){
    filtro.status = value.qty;
  }

  if(value.field === 'emailusuario'){
    filtro.emailusuario = value.qty;
  }

  return filtro;
}

}
