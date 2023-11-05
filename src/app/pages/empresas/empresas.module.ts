import { NgModule } from '@angular/core';
import { PrimeNGModule } from 'src/app/primeng.module';
import { SharedModule } from './../../shared/shared.module';
import { EmpresaCadastroComponent } from './empresa-cadastro/empresa-cadastro.component';
import { EmpresasListaComponent } from './empresas-lista/empresas-lista.component';
import { EmpresasRountingModule } from './empresas.routing';


@NgModule({
  declarations: [
     EmpresaCadastroComponent,
     EmpresasListaComponent
    ],
  imports: [
    PrimeNGModule,
    EmpresasRountingModule,
    SharedModule
  ],
})
export class EmpresaModule { }
