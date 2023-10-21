import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  sinal = true;
  valorTooltip = 'Inativos';

constructor(
  private http: HttpClient
) { }

formataSimeNao(Array: any){
  for(const i of Object.keys(Array)){
    if(Array[i].status === true){
      Array[i].statusformatado = 'Sim';
    } else {
      Array[i].statusformatado = 'Não';
    }
  }
}
 
formataAtivoeInativo(Array: any){
  (async () => {
    await Promise.all(
      Array.map(async (child) => {
        if(child.status === true){
          child.statusformatado = 'ATIVO';
        } else {
          child.statusformatado = 'INATIVO';
        }
      })
    );
  })();
  return Array;
}

}
