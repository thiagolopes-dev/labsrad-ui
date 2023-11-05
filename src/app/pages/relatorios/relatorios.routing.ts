import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../seguranca/auth.guard';
import { PrincipalComponent } from './principal/principal.component';



const routes: Routes = [
  {
  path: '', component: PrincipalComponent,
  canActivate: [AuthGuard],
  data: {roles: ['R_REL']}
  },

  ];

@NgModule({

  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})
export class RelatoriosRountingModule { }

