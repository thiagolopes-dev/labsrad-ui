import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../seguranca/auth.guard';
import { AtendimentoCadastroComponent } from './atendimento-cadastro/atendimento-cadastro.component';
import { AtendimentosListaComponent } from './atendimentos-lista/atendimentos-lista.component';


const routes: Routes = [

  {
  path: '', component: AtendimentosListaComponent,
  canActivate: [AuthGuard],
  data: {roles: ['R_ATEND']}
  },
  {
    path: 'novo', component: AtendimentoCadastroComponent,
    canActivate: [AuthGuard],
    data: {roles: ['C_ATEND']}
  },
  {
    path: ':id', component: AtendimentoCadastroComponent,
    canActivate: [AuthGuard],
    data: {roles: ['U_ATEND']}

},

  ];

@NgModule({

  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})
export class AtendimentosRountingModule { }

