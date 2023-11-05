import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../seguranca/auth.guard';
import { PrincipalComponent } from './principal/principal.component';

const routes: Routes = [
  {
  path: 'dashboard', component: PrincipalComponent,
  canActivate: [AuthGuard]
  }
  ];

@NgModule({

  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})
export class DashboardsRountingModule { }

