import { NgModule } from '@angular/core';
import { PrimeNGModule } from './../../primeng.module';

import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardsRountingModule } from './dashboard.routing';
import { PrincipalComponent } from './principal/principal.component';


@NgModule({
  declarations: [
   PrincipalComponent
  ],
  imports: [
    PrimeNGModule,
    DashboardsRountingModule,
    SharedModule
  ]
})
export class DashboardsModule { }
