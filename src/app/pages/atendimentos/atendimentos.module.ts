import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { PrimeNGModule } from './../../primeng.module';
import { AtendimentoCadastroComponent } from './atendimento-cadastro/atendimento-cadastro.component';
import { AtendimentosListaComponent } from './atendimentos-lista/atendimentos-lista.component';
import { AtendimentosRountingModule } from './atendimentos.routing';

@NgModule({
  declarations: [
    AtendimentoCadastroComponent,
    AtendimentosListaComponent
  ],
  imports: [
    PrimeNGModule,
    AtendimentosRountingModule,
  //  NgxMaskModule.forChild(),
    SharedModule
  ],

})
export class AtendimentosModule { }
