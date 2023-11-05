import { NgModule } from '@angular/core';
import { PrimeNGModule } from './../../primeng.module';

import { SharedModule } from 'src/app/shared/shared.module';
import { PacienteCadastroComponent } from './paciente-cadastro/paciente-cadastro.component';

import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { PacientesListaComponent } from './pacientes-lista/pacientes-lista.component';
import { PacientesRountingModule } from './pacientes.routing';

@NgModule({
  declarations: [
    PacienteCadastroComponent,
    PacientesListaComponent
  ],
  imports: [
    PrimeNGModule,
    PacientesRountingModule,
    NgxMaskDirective,
    NgxMaskPipe,
    SharedModule
  ],

})
export class PacientesModule { }
