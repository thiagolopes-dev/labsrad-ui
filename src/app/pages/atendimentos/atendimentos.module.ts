import { NgModule } from '@angular/core';
import { PrimeNGModule } from './../../primeng.module';

import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { SharedModule } from 'src/app/shared/shared.module';
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
    NgxMaskDirective,
    NgxMaskPipe,
    SharedModule
  ],

})
export class AtendimentosModule { }
