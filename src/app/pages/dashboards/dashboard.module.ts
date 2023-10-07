import { NgModule } from '@angular/core';
import { PrimeNGModule } from 'src/app/primeng.module';

import { ChartModule } from 'primeng/chart';
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
    SharedModule,
    ChartModule
  ]
})
export class DashboardsModule { }
