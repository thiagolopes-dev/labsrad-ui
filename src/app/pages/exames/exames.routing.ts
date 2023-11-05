import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../seguranca/auth.guard';
import { ExameCadastroComponent } from './exame-cadastro/exame-cadastro.component';
import { ExamesListaComponent } from './exames-lista/exames-lista.component';


const routes: Routes = [

  {
  path: '', component: ExamesListaComponent,
  canActivate: [AuthGuard],
  data: {roles: ['R_EXME']}
  },
  {
    path: 'novo', component: ExameCadastroComponent,
    canActivate: [AuthGuard],
    data: {roles: ['C_EXME']}
  },
  {
    path: ':id', component: ExameCadastroComponent,
    canActivate: [AuthGuard],
    data: {roles: ['U_EXME']}

},

  ];

@NgModule({

  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})
export class ExamesRountingModule { }

