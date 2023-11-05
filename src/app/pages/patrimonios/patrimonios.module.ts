import { NgModule } from '@angular/core';

import { PrimeNGModule } from 'src/app/primeng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PatrimonioCadastroComponent } from './patrimonio-cadastro/patrimonio-cadastro.component';
import { PatrimoniosListaComponent } from './patrimonios-lista/patrimonios-lista.component';
import { PatrimoniosRoutingModule } from './patrimonios.routing';



@NgModule({
  declarations: [
    PatrimonioCadastroComponent,
    PatrimoniosListaComponent
  ],
  imports: [
    PrimeNGModule,
    PatrimoniosRoutingModule,
    SharedModule,
  ]
})
export class PatrimoniosModule { }
