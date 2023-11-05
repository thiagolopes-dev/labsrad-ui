import { NgModule } from '@angular/core';
import { PrimeNGModule } from './../../primeng.module';

import { SharedModule } from 'src/app/shared/shared.module';
import { ExameCadastroComponent } from './exame-cadastro/exame-cadastro.component';
import { ExamesListaComponent } from './exames-lista/exames-lista.component';
import { ExamesRountingModule } from './exames.routing';


@NgModule({
  declarations: [
    ExameCadastroComponent,
    ExamesListaComponent
  ],
  imports: [
    PrimeNGModule,
    ExamesRountingModule,
    SharedModule
  ],

})
export class ExamesModule { }
