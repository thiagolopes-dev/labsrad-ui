import { NgModule } from '@angular/core';

import { PrimeNGModule } from '../../primeng.module';

import { SharedModule } from 'src/app/shared/shared.module';
import { PrincipalComponent } from './principal/principal.component';
import { RelatoriosRountingModule } from './relatorios.routing';



@NgModule({
  declarations: [ PrincipalComponent ],
  imports: [
    PrimeNGModule,
    SharedModule,
    RelatoriosRountingModule
  ],

})
export class RelatoriosModule { }
